/* jshint camelcase:false */

'use strict';

var pg = require('../postgres/manager');

// MAKE FORMS & FUNCTIONS TO ADD & SUBTRACT POINTS

function Friendship(){
}

Friendship.request = function(obj, cb){
  var psqlString = 'INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2) RETURNING id',
      psqlParams = [obj.userId, obj.friendId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

// ALL OF THESE REQUIRE UNION OF 2 QUERIES
Friendship.pending = function(){
// this can give the badge notification of pending friendships
};

Friendship.index = function(){
// list all friendships
};

Friendship.accept = function(){
// this updates the accepted column in pending friendship
};

Friendship.deny = function(){
// this updates the accepted column in pending friendship
};

// console.log('SERVER USER MODEL - Friendship.friendRequest ERROR: ', err);

module.exports = Friendship;
