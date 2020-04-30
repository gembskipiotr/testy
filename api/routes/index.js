const usersRoutes = require('./users');
const authRoutes = require('./auth');
const companyRoutes = require('./company');
const ordersRoutes = require('./orders');
const tasksRoutes = require('./tasks');
const notificationsRoutes = require('./notifications');

const routes = function (router) {
  usersRoutes(router);
  authRoutes(router);
  companyRoutes(router);
  ordersRoutes(router);
  tasksRoutes(router);
  notificationsRoutes(router);
};

module.exports = routes;
