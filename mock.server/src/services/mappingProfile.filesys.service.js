const fs = require('fs');
const path = require('path');

const conf = require('../config/mappingProfile');
const { getDate, getTime } = require('../utils/generics.util');


/**
 * Get the physical OS path of the profile, which is stoted as a .json file
 * @param {string} profileId - Identifier of the profile (Profile_No). Profile name must match the OS naming constraints.
 * @returns string - Path of the profile stored in .json
 */
const getProfileOsPath = (profileId, profileType) => path.join(conf.PROFILE_PATH, profileType, `${profileId}.json`);

/**
 * Get the physical OS path of the profile backup, which is stoted as a .json file
 * @param {string} profileId - Identifier of the profile (Profile_No). Profile name must match the OS naming constraints.
 * @returns string - Path of the profile stored in .json
 */
const getProfileBackupOsPath = (profileId, profileType) => path.join(conf.PROFILE_PATH, profileType, `${profileId}.json.backup`); 


/**
 * Get list of existing profiles.
 * @returns object[] - Array of Directory Entries object (Dirent).
 */
const getProfileFileList = () => {
    const arFiles = fs.readdirSync(path.resolve(conf.PROFILE_PATH + '/AccountReconciliation'), {withFileTypes: true});
    const arFiltered = arFiles.filter(obj => (obj.isFile()) && (obj['name'].endsWith('.json')));
    const dnFiles = fs.readdirSync(path.resolve(conf.PROFILE_PATH + '/DeliveryNote'), {withFileTypes: true});
    const dnFiltered = dnFiles.filter(obj => (obj.isFile()) && (obj['name'].endsWith('.json')));
    const orFiles = fs.readdirSync(path.resolve(conf.PROFILE_PATH + '/Order'), {withFileTypes: true});
    const orFiltered = orFiles.filter(obj => (obj.isFile()) && (obj['name'].endsWith('.json')));
    return { AccountReconciliation: arFiltered, DeliveryNote: dnFiltered, Order: orFiltered };
};


/**
 * Get the profile object by profile ID
 * @param {string} id - profile ID
 * @returns 
 */
const getProfileObjectByProfileId = (profileId, profileType) => {
    let profile;
    try {
        profile = JSON.parse(fs.readFileSync(getProfileOsPath(profileId, profileType)));
    } catch (err) {
        console.log(`[${(new Date()).toISOString()}]: Failed to read profile json file: ${err.message}`);
        return { error: { message: err.message, data: { Platform_No: profileId, profileType } } };
    }
    return profile;
};


/**
 * Returl all profiles.
 * @returns 
 */
const getProfiles = () => {
    const files = getProfileFileList();

    const profiles = {};
    const documentTypes = Object.keys(files);
    documentTypes.forEach(docType => {
        profiles[docType] = {};
        const profileNames = files[docType].map(obj => obj.name.replace('.json', ''));
        profileNames.forEach(p => {
            const profileObject = getProfileObjectByProfileId(p, docType);
            profiles[docType][p] = profileObject;
        });
    });
    

    return profiles;
};


/**
 * Save the profile to make it persistent
 * @param {string} profileId - Platform_No of the object
 * @param {object} profile - profile object
 * @returns 
 */
const writeProfileObject = (profileId, profileType, profile) => {
    if (!profile) {
        return {error: {message: 'No profile object provided when perform writeProfileObject() action.'}};
    }

    try {
        fs.writeFileSync(getProfileOsPath(profileId, profileType), JSON.stringify(profile));
    }
    catch (err) {
        return {error: {message: 'Unexpected error when saving profile.', error: err}};
    }

    return {success: {message: 'Profile saved successfully.'}};   

};



const createNewProfile = (profileId, profileType, profileConfig) => {
    if (isProfileExists(profileId, profileType)) {
        return { error: { message: 'Given profileId already exists.', data: { profileId, profileType } } };
    }

    const profile = { ...conf.DEFAULT_PROFILE_SHAPE, ...profileConfig };
    const writeProfileObjectResult = writeProfileObject(profileId, profileType, profile);

    if (writeProfileObjectResult.error) {
        return writeProfileObjectResult;
    }

    return profile;
};

/**
 * Check if the giving profileId already exists or not.
 * @param {string} profileId - Platform_No
 * @returns 
 */
const isProfileExists = (profileId, profileType) => {
    return fs.existsSync(getProfileOsPath(profileId, profileType));
}


/**
 * Make a backup copy of the profile.
 * @param {string} profileId - Platform_No
 */
const backupProfile = (profileId, profileType) => {
    fs.copyFileSync(getProfileOsPath(profileId, profileType), getProfileBackupOsPath(profileId, profileType));
};


/**
 * Rollback current profile to previously saved copy, while marking current profile as the copy after revert.
 * @param {string} profileId - Platform_No
 */
const revertProfile = (profileId, profileType) => {
    fs.renameSync(getProfileOsPath(profileId, profileType), getProfileOsPath(profileId, profileType) + '.swap');
    fs.renameSync(getProfileBackupOsPath(profileId), getProfileOsPath(profileId));
    fs.renameSync(getProfileOsPath(profileId, profileType) + '.swap', getProfileBackupOsPath(profileId, profileType));
};


/**
 * Delete specified profile - soft delete
 * @param {*} profileId 
 * @param {*} profileType 
 */
const deleteProfile = (profileId, profileType) => {
    fs.renameSync(getProfileOsPath(profileId, profileType), getProfileOsPath(profileId, profileType) + `.${getDate()}${getTime()}.deleted`);
};

module.exports = {
    getProfiles,
    getProfileObjectByProfileId,
    createNewProfile,
    backupProfile,
    revertProfile,
    deleteProfile,
    writeProfileObject, 
    isProfileExists
};