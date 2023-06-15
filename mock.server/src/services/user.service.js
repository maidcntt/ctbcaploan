const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const paginate = require('../utils/paginate');
const pick = require('../utils/pick');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {number} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async (email, excludeUserId) => {
  const whereOptionsAnd = [{ email }];
  if (excludeUserId) {
    whereOptionsAnd.push({ [Op.not]: { id: excludeUserId } });
  }
  const user = await User.findOne({ where: { [Op.and]: whereOptionsAnd } });
  return !!user;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Query for users
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<{rows: User[], count: number}>}
 */
const queryUsers = async (filter, options) => {
  const { sort, limit, offset } = paginate(options);
  const originalFilter = pick(filter, ['name', 'role', 'email']);
  const superiorFilter = pick(filter, ['superior_name', 'superior_email']);
  const superiorWhere = {};
  let superiorIds = [];
  if (superiorFilter.superior_name) {
    superiorWhere.name = superiorFilter.superior_name;
  }
  if (superiorFilter.superior_email) {
    superiorWhere.email = superiorFilter.superior_email;
  }
  if (Object.keys(superiorWhere).length !== 0) {
    superiorIds = await User.findAll({
      where: superiorWhere,
      attributes: ['id'],
      raw: true
    });
    originalFilter.superior_id = {
      [Op.in]: superiorIds.map((u) => u.id)
    };
  }
  const users = await User.findAndCountAll({
    where: originalFilter,
    order: sort,
    limit,
    offset
  });
  return users;
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.unscoped().findOne({ where: { email } });
};

/**
 * Update user by id
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {number} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById
};
