const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const logService = require('../services/log.service');

const getLogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  const result = await logService.queryLogs(filter, options);
  res.send(result);
});

module.exports = {
  getLogs
};
