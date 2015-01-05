'use strict';

module.exports = [
  {method: 'GET',    path: '/{param*}',                     config: require('../definitions/static/get_angular')},
  {method: 'POST',   path: '/register',                     config: require('../definitions/users/post_register')},
  {method: 'POST',   path: '/login',                        config: require('../definitions/users/post_login')},
  {method: 'DELETE', path: '/logout',                       config: require('../definitions/users/delete_logout')},
  {method: 'GET',    path: '/status',                       config: require('../definitions/users/get_status')},
  {method: 'GET',    path: '/users',                        config: require('../definitions/users/get_all_users')},
  {method: 'GET',    path: '/users/{searchEmail}',          config: require('../definitions/users/get_user')},
  // PRIZE ROUTES
  {method: 'POST',   path: '/prizes',                       config: require('../definitions/prizes/post_create_prize')},
  {method: 'GET',    path: '/prizes',                       config: require('../definitions/prizes/get_query_prizes')},
  {method: 'POST',   path: '/prizes/{prizeId}/upload',      config: require('../definitions/prizes/post_upload_image')},
  {method: 'GET',    path: '/prizes/{prizeId}',             config: require('../definitions/prizes/get_show_prize')},
  {method: 'DELETE', path: '/prizes/{prizeId}',             config: require('../definitions/prizes/delete_nuke_prize')},
  {method: 'GET',    path: '/prizes/count',                 config: require('../definitions/prizes/get_count_prizes')}
];

