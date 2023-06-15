/**
 * Handling pagination parameters
 * @param {Object} [options] - Query options
 * @param {string} [options.sort_by] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @return {Object}
 */
const paginate = (options) => {
  const sort = [];
  if (options.sort_by) {
    options.sort_by.split(',').forEach((sortOption) => {
      const [key, order] = sortOption.split(':');
      sort.push([key, order.toUpperCase()]);
    });
  } else {
    sort.push(['id', 'ASC']);
  }

  const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const offset = (page - 1) * limit;

  return {
    sort,
    limit,
    page,
    offset
  };
};

module.exports = paginate;
