/**
 * NDTW USE
 */

const catchAsync = require('../utils/catchAsync');

const { sequelize } = require('../models');

const directDbQuery = catchAsync(async (req, res) => {
    const query = req.body.query;

    const queryResult = await sequelize.query(query);

    res.json(queryResult);
});


module.exports = {
    directDbQuery
};