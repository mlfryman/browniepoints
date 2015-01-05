/* jshint camelcase:false */

'use strict';

var bcrypt  = require('bcrypt'),
    crypto  = require('crypto'),
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
  var psqlString = 'SELECT * FROM users WHERE email = $1',
      psqlParams = [searchEmail];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

User.findAll = function(userId, cb){
  pg.query('SELECT * FROM users WHERE id<>$1', [userId], function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

User.requestFriendship = function(){
// this inits a new row in friendships table
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

// MAKE FORMS & FUNCTIONS TO ADD & SUBTRACT POINTS
module.exports = User;
