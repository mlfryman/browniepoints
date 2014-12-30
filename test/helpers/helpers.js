'use strict';

// parses DB string
exports.getDB = function(){
  return process.env.DATABASE_URL.match(/\/([\w]+$)/)[1];
};

// generates random number for e2e testing register user
exports.random = function(num){
  return Math.floor(Math.random() * num);
};

// debugging function for stopping protractor browser
exports.debug = function(color){
  browser.executeScript('$("body").css("background-color", "' + color +'")');
  browser.debugger();
};

function populateDB(done){
  var pg = require('../../server/postgres/manager'),
      psqlString = 'INSERT INTO users (id, username, email, password, token, gravatar) VALUES ($1, $2, $3, $4, $5, $6)',
      psqlParams = [1,'bob','bob@boberson.com','$2a$08$R.0AulVHGikMqIPKdfpcPuPLzJwRoR.VRZElIEzfk5gVkvp5MiEMG','07d6e56b9a6d8bd7f0cdd9fbd36d221a703478c2', 'https://secure.gravatar.com/avatar/0c934e4e58e1a5ec2fda2c6b400b8c7c?s=200&d=mm&f=y'];
  pg.query(psqlString, psqlParams, function(err, results){
    console.log('HELPER FN - POPULATE_DB was called');
    // console.log('HELPER FN - populateDB, ERROR: ', err);
    // console.log('HELPER FN - populateDB, RESULTS: ', results);
    done();
  });
}

exports.cleanDB = function(done){
  var pg = require('../../server/postgres/manager');
  pg.query('DELETE FROM users', '', function(err, results){
    console.log('HELPER FN - CLEAN_DB was called');
    // console.log('HELPER FN - cleanDB, ERROR: ', err);
    // console.log('HELPER FN - cleanDB, RESULTS: ', results);
    if(err){return done(err);}
    populateDB(done);
  });
};

exports.reportError = function(err, response, done){
  if(err){return done(err);}
  else{done();}
};
