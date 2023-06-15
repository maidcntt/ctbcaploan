/**
 * NDTW USE
 */

const catchAsync = require('../utils/catchAsync');



const getHealth = catchAsync(async (req, res) => {
    res.json({ status: 'ok' });
});


module.exports = {
    getHealth
};