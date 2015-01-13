'use strict';

module.exports = [
  {method: 'GET',    path: '/{param*}',                       config: require('../definitions/static/get_angular')},
  {method: 'POST',   path: '/register',                       config: require('../definitions/users/post_register')},
  {method: 'POST',   path: '/login',                          config: require('../definitions/users/post_login')},
  {method: 'DELETE', path: '/logout',                         config: require('../definitions/users/delete_logout')},
  {method: 'GET',    path: '/status',                         config: require('../definitions/users/get_status')},
  {method: 'GET',    path: '/users',                          config: require('../definitions/users/get_all_users')},
  {method: 'GET',    path: '/users/{searchEmail}',            config: require('../definitions/users/get_user')},

  // FRIENDSHIPS ROUTES
  {method: 'POST',   path: '/friends/request/{friend2Id}',    config: require('../definitions/friendships/post_friend_request')},
  {method: 'GET',    path: '/friends/pending',                config: require('../definitions/friendships/get_pending_friendships')},
  {method: 'PUT',    path: '/friends/{friendshipId}/accept',  config: require('../definitions/friendships/put_accept_friendship')},
  {method: 'DELETE', path: '/friends/{friendshipId}/deny',    config: require('../definitions/friendships/delete_deny_friendship')},
  {method: 'GET',    path: '/friends',                        config: require('../definitions/friendships/get_all_friendships')},
  {method: 'GET',    path: '/friends/{friendshipId}',         config: require('../definitions/friendships/get_show_friendship')},

  // FRIENDSHIPS-TRANSACTIONS ROUTES
  {method: 'POST',   path: '/friends/{friendshipId}/reward',  config: require('../definitions/friendships/post_reward_friendship')},
  {method: 'POST',   path: '/friends/{friendshipId}/punish',  config: require('../definitions/friendships/post_punish_friendship')},
  {method: 'GET',    path: '/friends/{friendshipId}/transactions',  config: require('../definitions/friendships/get_all_transactions')},
  {method: 'GET',    path: '/friends/{friendshipId}/wallet',        config: require('../definitions/friendships/get_my_wallet')},
  {method: 'GET',    path: '/friends/{friendshipId}/wallet/{friendId}',        config: require('../definitions/friendships/get_friend_wallet')},

  // PRIZE ROUTES
  {method: 'GET',    path: '/categories',                                     config: require('../definitions/prizes/get_categories')},
  {method: 'POST',   path: '/friends/{friendshipId}/prizes',                  config: require('../definitions/prizes/post_create_prize')},
  {method: 'GET',    path: '/friends/{friendshipId}/prizes',                  config: require('../definitions/prizes/get_all_prizes')},
  {method: 'GET',    path: '/friends/{friendshipId}/prizes/{prizeId}',        config: require('../definitions/prizes/get_show_prize')},
  {method: 'DELETE', path: '/friends/{friendshipId}/prizes/{prizeId}',        config: require('../definitions/prizes/delete_nuke_prize')},
  {method: 'POST',   path: '/friends/{friendshipId}/prizes/{prizeId}',        config: require('../definitions/prizes/post_buy_prize')}
];
