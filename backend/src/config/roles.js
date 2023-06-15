const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getLogs', 'getLineNotifyURL', 'sendLineNotify'],
  sales_sodn: [],
  fi_accnt_banking: [],
  pp_prod_doc: [],
  integration_viewer: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights
};
