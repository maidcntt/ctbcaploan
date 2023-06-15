const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const logRoute = require('./log.route');
const lineNotifyRoute = require('./lineNotify.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const adminRoute = require('./ndtwadmin.route')
const unmatchedRoute = require('./unmatched.route');
const serviceRootRoute = require('./serviceRoot.route');

const ctbcAuthRoute = require('./ctbcauth.route');
const ctbcMenesRoute = require('./ctbcmenes.route');

const router = express.Router();

const ROUTE_PREFIX = '';
const defaultRoutes = [
  {
    path: ROUTE_PREFIX + '/auth',
    route: authRoute
  },
  {
    path: ROUTE_PREFIX + '/users',
    route: userRoute
  },
  {
    path: ROUTE_PREFIX + '/logs',
    route: logRoute
  },
  {
    path: ROUTE_PREFIX + '/line-notify',
    route: lineNotifyRoute
  },
  {
    path: ROUTE_PREFIX + '/ndtwadmin',
    route: adminRoute
  },
  {
    path: ROUTE_PREFIX + '/ctbcauth',
    route: ctbcAuthRoute
  },
  {
    path: ROUTE_PREFIX + '/ctbcmenes',
    route: ctbcMenesRoute
  },
  {
    path: ROUTE_PREFIX,
    route: serviceRootRoute
  },
  {
    path: '*',
    route: unmatchedRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
