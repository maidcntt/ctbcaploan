const { Op } = require('sequelize');
const { ConsoleLog } = require('../models');


const queryConsoleLog = async (reqBody) => {
    const filter = {};
    let fetchLimit = 100;

    if (reqBody.type) {
        filter.type = reqBody.type;
    }

    if (reqBody.sessionId) {
        filter.sessionId = reqBody.sessionId;
    }

    let created_at = {};
    if (reqBody.after) {
        created_at = { [Op.gte]: reqBody.after };
        // filter.created_at = { [Op.gte]: reqBody.after }
    }
    if (reqBody.before) {
        created_at = { ...created_at, [Op.lte]: reqBody.before };
        // filter.created_at = { ...created_at, [Op.lte]: reqBody.before }
    }
    filter.created_at = created_at;

    if (typeof reqBody.fetch !== 'undefined') {
        const numFetchLimit = Number(reqBody.fetch);
        if (numFetchLimit > 0) {
            fetchLimit = numFetchLimit;
        } else {
            fetchLimit = undefined
        }
        
    }

    const findConditions = {
        where: { [Op.and]: filter },
        order: [['id', 'DESC']],
        limit: fetchLimit
        // logging: console.log
    }

    // console.log(`filter:`);
    // console.log(filter);
    
    const result = await ConsoleLog.findAll(findConditions);

    return { fetch: (fetchLimit || result.length), logs: result};
};


module.exports = {
    queryConsoleLog
};