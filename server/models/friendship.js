/* jshint camelcase:false */

'use strict';

var pg = require('../postgres/manager');

function Friendship(){
}

Friendship.request = function(obj, cb){
  console.log('SERVER FRIENDSHIP MODEL - Friendship.request OBJ: ', obj);
  generatePK(obj.friend1Id, obj.friend2Id, function(friendshipId){
    obj.friendshipId = friendshipId;
    var psqlString = 'SELECT * FROM request_friendship($1,$2,$3)',
        psqlParams = [obj.friendshipId, obj.friend1Id, obj.friend2Id];
    pg.query(psqlString, psqlParams, function(err, results){
      console.log('SERVER FRIENDSHIP MODEL - .request ERROR: ', err);
      console.log('SERVER FRIENDSHIP MODEL - .request RESULTS: ', results);
      var fid = (results || {rows:[{}]}).rows[0].request_friendship;
      console.log('SERVER FRIENDSHIP MODEL - Friendship.request FID: ', fid);
      cb(err, fid);
    });
  });
};

Friendship.pending = function(user, cb){
  var psqlString = 'SELECT * FROM find_pending_friends($1)',
      psqlParams = [user.id];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .pending RESULTS: ', results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.findAll = function(user, cb){
  var psqlString = 'SELECT * FROM find_all_friends($1)',
      psqlParams = [user.id];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .findAll RESULTS: ', results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.findOne = function(user, friendshipId, cb){
  var psqlString = 'SELECT * FROM show_friend($1, $2)',
      psqlParams = [user.id, friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .findOne RESULTS: ', results);
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Friendship.accept = function(friendshipId, cb){
  var psqlString = 'UPDATE friendships SET accepted = TRUE WHERE id = $1 RETURNING id;',
      psqlParams = [friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .accept ERROR: ', err);
    // console.log('SERVER FRIENDSHIP MODEL - .accept RESULTS: ', results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.deny = function(friendshipId, cb){
  var psqlString = 'DELETE FROM friendships WHERE id = $1 RETURNING id;',
      psqlParams = [friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .deny ERROR: ', err);
    // console.log('SERVER FRIENDSHIP MODEL - .deny RESULTS: ', results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.reward = function(friendshipId, obj, cb){
  var psqlString = 'INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      psqlParams = [friendshipId, obj.from_id, obj.to_id, obj.body, obj.points];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .reward RESULTS: ', results);
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Friendship.punish = function(friendshipId, obj, cb){
  var psqlString = 'INSERT INTO transactions (friendship_id, from_id, to_id, body, points) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      psqlParams = [friendshipId, obj.from_id, obj.to_id, obj.body, obj.points];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .punish RESULTS: ', results);
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Friendship.findAllTransactions = function(friendshipId, cb){
  var psqlString = 'SELECT * FROM find_all_transactions($1)',
      psqlParams = [friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER FRIENDSHIP MODEL - .findAllTransactions RESULTS: ', results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

Friendship.myWallet = function(friendshipId, myId, cb){
  var psqlString = 'SELECT * FROM sum_my_wallet($1,$2)',
      psqlParams = [friendshipId, myId];
  pg.query(psqlString, psqlParams, function(err, results){
    var myWallet = (results || {rows:[{}]}).rows[0].sum_my_wallet;
    // console.log('SERVER FRIENDSHIP MODEL - .myWallet myWallet: ', myWallet);
    cb(err, myWallet);
  });
};

Friendship.friendWallet = function(friendshipId, friendId, cb){
  var psqlString = 'SELECT * FROM sum_friend_wallet($1,$2)',
      psqlParams = [friendshipId, friendId];
  pg.query(psqlString, psqlParams, function(err, results){
    var friendWallet = (results || {rows:[{}]}).rows[0].sum_friend_wallet;
    // console.log('SERVER FRIENDSHIP MODEL - .friendWallet friendWallet: ', friendWallet);
    cb(err, friendWallet);
  });
};

module.exports = Friendship;

function generatePK(id1, id2, cb){
 var small, large;
  if(id1 > id2){
    large = id1.toString();
    small = id2.toString();
  }else{
    small = id1.toString();
    large = id2.toString();
  }
  var friendshipId = ((small + large) * 1);
  cb(friendshipId);
}
