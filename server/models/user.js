/* jshint camelcase:false */

'use strict';

var bcrypt  = require('bcrypt'),
    crypto  = require('crypto'),
    // AWS     = require('aws-sdk'),
    // concat = require('concat-stream'),
    // path   = require('path'),
    pg      = require('../postgres/manager');

function User(obj){
  this.first_name = obj.first_name;
  this.last_name  = obj.last_name;
  this.username   = obj.username;
  this.email      = obj.email;
}

User.register = function(obj, cb){
  var user = new User(obj);
  user.password = bcrypt.hashSync(obj.password, 8);
  user.token    = crypto.createHash('sha1').update(obj.email).digest('hex');

  var cleanEmail = user.email.toLowerCase().trim(),
      emailHash  = crypto.createHash('md5').update(cleanEmail).digest('hex');
  user.gravatar  = 'https://secure.gravatar.com/avatar/' + emailHash + '?s=200&d=mm&f=y';

  var psqlString = 'INSERT INTO users (first_name, last_name, username, email, password, token, gravatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      psqlParams = [user.first_name, user.last_name, user.username, user.email, user.password, user.token, user.gravatar];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

User.login = function(obj, cb){
  var psqlString = 'SELECT * FROM users WHERE username = $1 limit 1',
      psqlParams = [obj.username];
  pg.query(psqlString, psqlParams, function(err, results){
    if(err || !results.rowCount){return cb();}
    var isAuth = bcrypt.compareSync(obj.password, results.rows[0].password);
    if(!isAuth){return cb();}
    var user = results.rows[0];
    delete user.password;
    cb(user);
  });
};

User.findByEmail = function(searchEmail, cb){
  var psqlString = 'SELECT id, first_name, last_name, username, email, gravatar FROM users WHERE email = $1',
      psqlParams = [searchEmail];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

User.findAll = function(userId, cb){
  pg.query('SELECT * FROM users WHERE id <> $1', [userId], function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

User.friendRequest = function(userId, friendId, cb){
  var psqlString = 'INSERT INTO friendships (user_id, friend_id) VALUES ($1, $2) RETURNING id',
      psqlParams = [];
  pg.query(psqlString, psqlParams, function(err, results){
    console.log('SERVER USER MODEL - User.friendRequest ERROR: ', err);
    console.log('SERVER USER MODEL - User.friendRequest RESULTS: ', results);
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

// ALL OF THESE REQUIRE UNION OF 2 QUERIES
User.pendingFriendships = function(){
// this can give the badge notification of pending friendships
};

User.friendships = function(){
// list all friendships
};

User.acceptFriendship = function(){
// this updates the accepted column in pending friendship
};

User.denyFriendship = function(){
// this updates the accepted column in pending friendship
};

module.exports = User;

// User.upload = function(userId, file, name, cb){
//   var s3 = new AWS.S3();

//   crypto.randomBytes(48, function(ex, buf){
//     var hex        = buf.toString('hex'),
//         loc        = user.token + '/' + user.id + '/' + hex + path.extname(name),
//         url        = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc,
//         psqlString = 'INSERT INTO avatars (user_id, url) VALUES ($1, $2) RETURNING id',
//         psqlParams = [user.id, url];

//     pg.query(psqlString, psqlParams, function(err, results){
//       if(err){return cb(err);}

//       file.pipe(concat(function(buf){
//         var params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: buf, ACL: 'public-read'};
//         s3.putObject(params, cb);
//       }));
//     });
//   });
// };
