'use strict';

module.exports = [
  {method: 'GET',    path: '/{param*}',   config: require('../definitions/static/get_angular')},
  {method: 'POST',   path: '/register',   config: require('../definitions/users/post_register')},
  {method: 'POST',   path: '/login',      config: require('../definitions/users/post_login')},
  {method: 'DELETE', path: '/logout',     config: require('../definitions/users/delete_logout')},
  {method: 'GET',    path: '/status',     config: require('../definitions/users/get_status')}
];
