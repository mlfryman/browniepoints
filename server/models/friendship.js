/* jshint camelcase:false */

'use strict';

var pg = require('../postgres/manager');

function Friendship(){
}

Friendship.request = function(obj, cb){
  generatePK(obj.friend1Id, obj.friend2Id, function(friendshipId){
    obj.friendshipId = friendshipId;
    var psqlString = 'INSERT INTO friendships (id, friend1_id, friend2_id) VALUES ($1, $2, $3) RETURNING id',
        psqlParams = [obj.friendshipId, obj.friend1Id, obj.friend2Id];
    pg.query(psqlString, psqlParams, function(err, results){
     cb(err, results && results.rows ? results.rows[0] : null);
    });
  });
};

Friendship.pending = function(user, cb){
  var psqlString = 'SELECT * FROM pending_friendships_by_user($1)',
      psqlParams = [user.id];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.findAll = function(userId, cb){
  console.log('SERVER FRIENDSHIP MODEL - Friendship.findAll userId): ', userId);
  var psqlString = 'SELECT * FROM list_friends($1)',
      psqlParams = [userId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.accept = function(friendshipId, cb){
  var psqlString = 'UPDATE friendships SET accepted=true WHERE id = $1 RETURNING id;',
      psqlParams = [friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.deny = function(friendshipId, cb){
  var psqlString = 'DELETE FROM friendships WHERE id = $1 RETURNING id;',
      psqlParams = [friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

module.exports = Friendship;

function generatePK(id1, id2, cb){
 var small, large;
  if(id1 > id2){
    large = id1.toString();
    small = id2.toString();
  }else{
    small=id1.toString();
    large=id2.toString();
  }
  var friendshipId = ((small + large) * 1);
  cb(friendshipId);
}
