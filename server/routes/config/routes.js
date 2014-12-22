'use strict';

module.exports = [
  {method: 'GET',    path: '/{param*}',   config: require('../definitions/static/angular')},
  {method: 'POST',   path: '/register',   config: require('../definitions/users/register')},
  {method: 'POST',   path: '/login',      config: require('../definitions/users/login')},
  {method: 'DELETE', path: '/logout',     config: require('../definitions/users/logout')},
  {method: 'GET',    path: '/status',     config: require('../definitions/users/status')}
];
