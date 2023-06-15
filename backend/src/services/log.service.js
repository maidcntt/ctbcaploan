const { Log } = require('../models');
const paginate = require('../utils/paginate');

/**
 * Query for logs
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{rows: Log[], count: number}>}
 */
const queryLogs = async (filter, options) => {
  const { sort, limit, offset } = paginate(options);
  const logs = await Log.findAndCountAll({
    where: filter,
    order: sort,
    limit,
    offset
  });
  return logs;
};

module.exports = {
  queryLogs
};
