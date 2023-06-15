const uuid = require('uuid');

const profileSvc = require('../services/mappingProfile.filesys.service');
const conf = require('../config/mappingProfile');



const ENUM_PROFILE_TYPES = {
    ACCOUNT_RECONCILIATION: 'AccountReconciliation',
    DELIVERY_NOTE: 'DeliveryNote',
    ORDER: 'Order'
};


/**
 * 取得目前所有的平台設定列表
 * @returns 
 */
const getProfiles = () => {
    const profiles = profileSvc.getProfiles();
    return profiles;
};


/**
 * 取得指定平台的設定檔
 * @param {*} profileId 設定檔編號
 * @param {*} profileType 設定檔種類 
 * @returns 
 */
const getProfile = (profileId, profileType) => {
    const profile = profileSvc.getProfileObjectByProfileId(profileId, profileType);
    return profile;
};


const createNewProfile = (profileId, profileType, profileConfig) => {
    const result = profileSvc.createNewProfile(profileId, profileType, profileConfig)
    return result;
};



/**
 * 複製指定設定檔的欄位對應到另外的設定檔
 * @param {*} profileType 設定檔種類
 * @param {*} fromProfileId 複製來源的設定檔平台編號
 * @param {*} toProfileId 複製目的的設定檔平台編號
 * @returns 
 */
const copyProfile = (profileType, fromProfileId, toProfileId) => {
    if (!isProfileExists(fromProfileId, profileType)) {
        console.log(`Specified copyfrom profile does not exist: ${fromProfileId}`);
        return { 
            code: 400, 
            message: `Specified copyfrom profile does not exist`, 
            data: { profileType, copyFrom: fromProfileId, copyTo: toProfileId }
        }
    }

    if (!isProfileExists(toProfileId, profileType)) {
        console.log(`Specified copyto profile does not exist: ${toProfileId}`);
        return { 
            code: 400, 
            message: `Specified copyto profile does not exist`, 
            data: { profileType, copyFrom: fromProfileId, copyTo: toProfileId }
        }
    }

    const fromProfile = getProfile(fromProfileId, profileType);
    const toProfile = getProfile(toProfileId, profileType);


    toProfile.columnMappings = fromProfile.columnMappings;
    profileSvc.writeProfileObject(toProfileId, profileType, toProfile);
    return { code: 200, profile: toProfile };
};


/**
 * 軟刪除指定的設定檔
 * @param {*} profileType 設定檔種類
 * @param {*} profileId 平台編號
 * @returns 
 */
const deleteProfile = (profileType, profileId) => {
    if (!isProfileExists(profileId, profileType)) {
        console.log(`Specified profile does not exist when deleting: ${profileId}`);
        return { 
            code: 400, 
            message: `Specified profile does not exist`, 
            data: { profileType, Platform_No: profileId }
        }
    }

    profileSvc.deleteProfile(profileId, profileType);

    return { code: 200, message: 'Specified profile has been deleted.' };
};

const isProfileExists = (profileId, profileType) => {
    return profileSvc.isProfileExists(profileId, profileType);
};


/**
 * Update the profile by given patch object.
 * @param {string} profileId - Platform_No
 * @param {object} patch - object to patch the profile
 * @returns object - latest profile object after taking the action 
 */
const patchPlatformProfile = (profileId, profileType, patch) => {
    const profile = profileSvc.getProfileObjectByProfileId(profileId, profileType);

    if (profile.error) {
        return { error: { code: 400, ...profile } };
    }

    const patchResult = {};

    const allowedRootKeys = Object.keys(conf.DEFAULT_PROFILE_SHAPE);
    const keysToPatch = Object.keys(patch);
    
    // console.log(`Received patch:`);
    // console.log(patch);

    // Only validated keyname can be passed. Return error when illegal found.
    // Optional: disable this feature?
    for (let i = 0; i < keysToPatch.length; i++) {
        if (!allowedRootKeys.includes(keysToPatch[i])) {
            console.log(`[${(new Date()).toISOString()}]: Unexpected key name ${keysToPatch[i]} found in the patch.`);
            return {code: 400,  error: { message: 'Unexpected key name found.', key: keysToPatch[i] } };
        }
    }

    // platformName: if not specified, current value will not be changed
    if (typeof patch.platformName !== 'undefined') {
        profile.platformName = String(patch.platformName);
    } 

    // hasHeader: if not specified, current value will not be changed
    if (typeof patch.hasHeader === 'boolean') {
        profile.hasHeader = patch.hasHeader;
    }

    // ZZORDERSTATUS for sales orders
    // 2023-03-02 disabling else logic to check if the occassionally disappearing comes again or not 
    if (typeof patch.ZZORDERSTATUS === 'number') {
        if (profile.ZZORDERSTATUS >= 0) {
            profile.ZZORDERSTATUS = patch.ZZORDERSTATUS;
        } 
        // else {
        //     // prevent a minus nuber is provided
        //     profile.ZZORDERSTATUS = null;
        // }
    } else {
        // profile.ZZORDERSTATUS = null;
    }

    // workbookCodepage: if not specified, current value will not be changed
    if (typeof patch.workbookCodepage === 'number') {
        profile.workbookCodepage = patch.workbookCodepage;
    }

    // columnMappings: optional - if not specified, current value will not be changed
    //                            object level is optional but keys inside the object level are mostly required
    if (patch.columnMappings && patch.columnMappings instanceof Array) {
        for (let i = 0; i < patch.columnMappings.length; i++) {
            const colObj = patch.columnMappings[i];

            // check availability of mandatory keys
            if (typeof colObj.excelColumnIndex === 'undefined') {
                return {code: 400, error: {message: 'Missing required key \'excelColumnIndex\'.', source: colObj}};
            }
            if (!isValidColumnIndex(colObj.excelColumnIndex)) {
                return {code: 400, error: {message: 'Missing \'excelColumnIndex\' or value is invalid.', source: colObj}};
            }
            if (!colObj.excelColumnName) {
                return {code: 400, error: {message: 'Missing required key \'excelColumnName\'.', source: colObj}};
            }
            // In FI, sapFieldName may empty
            if (!colObj.sapFieldName || colObj.sapFieldName === '') {
                colObj.sapFieldName = ' ';
            }

            if (!colObj.sapFieldName) {
                return {code: 400, error: {message: 'Missing required key \'sapFieldName\'.', source: colObj}};
            }

            if (!(!(typeof colObj.excelFieldContent === 'undefined' ) !== (typeof colObj.sapFieldDvalue === 'undefined'))) {
                return {code: 400, error: {message: 'Key \'excelFieldContent\' and \'sapFieldDvalue\' must be either both provided or none in the same time.', source: colObj}};
            }

            // if sapFieldId is empty, remove if there are sapFieldDvalue or excelFieldContent
            if (colObj.sapFieldId === '') {
                // console.log()
                if (colObj.sapFieldDvalue === '') {
                    delete colObj.sapFieldDvalue;
                }
                if (colObj.excelFieldContent === '') {
                    delete colObj.excelFieldContent;
                }
            }

            if (typeof colObj.sapFieldId === 'undefined') {
                colObj.sapFieldId = '';
            }

            // force type explicit 
            const excelColumnIndex = Number(colObj.excelColumnIndex);

            // console.log(`received a patch for column index ${colObj.excelColumnIndex}`);
            // console.log(colObj);

            // check if this is to add a new one or to modify existing 


            // const existingIndex = _findMatchIndex(colObj, profile.columnMappings);
            const existingIndex = (colObj.id) ? profile.columnMappings.findIndex(e => e.id === colObj.id) : -1;

            if (existingIndex !== -1) {
                // replace (delete) current if one existing found
                profile.columnMappings.splice(existingIndex, 1);
            }

             // insert new
             const indexToInsert = _findInsertIndex(colObj, profile.columnMappings);
            //  console.log(`going to insert at index ${indexToInsert}`);
             profile.columnMappings.splice(indexToInsert, 0, { id: uuid.v4(), ...colObj});
        }
    }

    // console.log(`patchResult`);
    // console.log(patchResult);

    profileSvc.backupProfile(profileId, profileType);
    profileSvc.writeProfileObject(profileId, profileType, profile);
    return { patched: patch, currentProfile: profile };

};



const deleteColumnMapping = (profileId, profileType, id) => {
    const profile = profileSvc.getProfileObjectByProfileId(profileId, profileType);

    const indexToDelete = profile.columnMappings.findIndex(e => e.id === id);
    console.log(`find delete index ${indexToDelete}`);
    if (indexToDelete === -1) {
        return { error: { message: 'Cannot find matched column mapping object to delete.', data: { id } } };
    }

    console.log(`find index to delete at: ${indexToDelete}`);

    const deleted = profile.columnMappings.splice(indexToDelete, 1);

    profileSvc.backupProfile(profileId, profileType);
    profileSvc.writeProfileObject(profileId, profileType, profile);

    return { deleted, currentProfile: profile };

};


/**
 * 
 * @param {*} colObj 
 * @param {*} columnMappings 
 */
const _findInsertIndex = (colObj, columnMappings) => {
    let idx;
    for (idx = 0; idx < columnMappings.length; idx++) {
        // order by excelColumnIndex, sapFieldDvalue
        if (columnMappings[idx].excelColumnIndex < colObj.excelColumnIndex) {
            // console.log(`idx ${idx}: excelColumnIndex ${colObj.excelColumnIndex} to patch is < mapping ${columnMappings[idx].excelColumnIndex} - continue`);
            continue;
        }

        if (columnMappings[idx].excelColumnIndex > colObj.excelColumnIndex) {
            break;
        }

        if (typeof colObj.sapFieldDvalue === 'undefined' && typeof columnMappings[idx].sapFieldDvalue === 'undefined') {
            // console.log(`idx ${idx}: both are simple mapping - continue`);
            continue;
        }

        if (typeof colObj.sapFieldDvalue !== 'undefined' && colObj.sapFieldDvalue > columnMappings[idx].sapFieldDvalue) {

            continue;
        }
        // console.log(`loop break when currIndex = ${idx}`);
        break;
    }

    return idx;
};


/**
 * Delete the first matched mapping
 * @param {*} colObj 
 * @param {*} columnMappings 
 */
const _findMatchIndex = (colObj, columnMappings) => {
    let idx;
    for (idx = 0; idx < columnMappings.length; idx++) {
        if (colObj.excelColumnIndex === columnMappings[idx].excelColumnIndex) {
            console.log(`DELETE CHECK: colObj.sapFieldId '${colObj.sapFieldId}' === columnMappings[idx].sapFieldId '${columnMappings[idx].sapFieldId}' ? ${(colObj.sapFieldId === columnMappings[idx].sapFieldId)}`);
            console.log(`DELETE CHECK: colObj.excelFieldContent '${colObj.excelFieldContent}' === columnMappings[idx].excelFieldContent '${columnMappings[idx].excelFieldContent}' ? ${(colObj.excelFieldContent === columnMappings[idx].excelFieldContent)}`);
            if (colObj.sapFieldId === columnMappings[idx].sapFieldId && colObj.excelFieldContent === columnMappings[idx].excelFieldContent) {
                return idx;
            }
        }
    }

    return -1;
};


/**
 * Check if the specified excelColumnIndex is valid or not.
 * @param {number} value - the excelColumnIndex
 * @returns boolean - true when valid, and false when invalid
 */
const isValidColumnIndex = (value) => {
    const num = Number(value);
    return !(Number.isNaN(Number(num)) || num < 0);
};



module.exports = {
    ENUM_PROFILE_TYPES, 
    getProfiles, 
    getProfile,
    copyProfile,
    deleteProfile,
    isProfileExists,
    createNewProfile,
    patchPlatformProfile,
    deleteColumnMapping,
    isValidColumnIndex
};