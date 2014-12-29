'use strict';

var bcrypt  = require('bcrypt'),
    crypto  = require('crypto'),
    pg      = require('../postgres/manager');

function User(obj){
  this.username   = obj.username;
  this.email      = obj.email;
}

User.register = function(obj, cb){
  var user = new User(obj);
  user.password = bcrypt.hashSync(obj.password, 8);
  user.token    = crypto.createHash('sha1').update(obj.email).digest('hex');

  var psqlString = 'INSERT INTO users (username, email, password, token) VALUES ($1, $2, $3, $4) RETURNING id',
      psqlParams = [user.username, user.email, user.password, user.token];
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER USER MODEL - REGISTER, ERROR: ', err);
    // console.log('SERVER USER MODEL - REGISTER, RESULTS: ', results);
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

module.exports = User;
