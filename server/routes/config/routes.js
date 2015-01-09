'use strict';

module.exports = [
  {method: 'GET',    path: '/{param*}',                       config: require('../definitions/static/get_angular')},
  {method: 'POST',   path: '/register',                       config: require('../definitions/users/post_register')},
  {method: 'POST',   path: '/login',                          config: require('../definitions/users/post_login')},
  {method: 'DELETE', path: '/logout',                         config: require('../definitions/users/delete_logout')},
  {method: 'GET',    path: '/status',                         config: require('../definitions/users/get_status')},
  // {method: 'POST',   path: '/users/{userId}/upload',        config: require('../definitions/users/post_upload_avatar')},
  {method: 'GET',    path: '/users',                          config: require('../definitions/users/get_all_users')},
  {method: 'GET',    path: '/users/{searchEmail}',            config: require('../definitions/users/get_user')},

  // PRIZE ROUTES
  {method: 'POST',   path: '/prizes',                         config: require('../definitions/prizes/post_create_prize')},
  {method: 'GET',    path: '/prizes',                         config: require('../definitions/prizes/get_query_prizes')},
  {method: 'POST',   path: '/prizes/{prizeId}/upload',        config: require('../definitions/prizes/post_upload_image')},
  {method: 'GET',    path: '/prizes/{prizeId}',               config: require('../definitions/prizes/get_show_prize')},
  {method: 'DELETE', path: '/prizes/{prizeId}',               config: require('../definitions/prizes/delete_nuke_prize')},
  {method: 'GET',    path: '/prizes/count',                   config: require('../definitions/prizes/get_count_prizes')},

  // FRIENDSHIPS ROUTES
  {method: 'POST',   path: '/friends/request',                config: require('../definitions/friendships/post_friend_request')},
  {method: 'GET',    path: '/friends/pending',                config: require('../definitions/friendships/get_pending_friendships')},
  // {method: 'GET',    path: '/friends',                     config: require('../definitions/friendships/get_all_friends')}
  // {method: 'GET',    path: '/friends/{friendId}',          config: require('../definitions/friendships/get_show_friend')},
  {method: 'PUT',    path: '/friends/{friendshipId}/accept',  config: require('../definitions/friendships/put_accept_friendship')},
  {method: 'DELETE', path: '/friends/{friendshipId}/deny',    config: require('../definitions/friendships/delete_deny_friendship')}
];
