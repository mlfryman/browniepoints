/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    User       = require('../../server/models/user'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getDB();

describe('User', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a User object', function(done){
      var user = new User({username:'bob', email:'bob@boberson.com'});

      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('bob');
      expect(user.email).to.equal('bob@boberson.com');
      done();
    });
  });

  describe('.register', function(){
    it('should register a new User', function(done){
      User.register({username:'sam', email:'sam@sam.com', password:'456789'}, function(err, results){
        console.log('SERVER USER UNIT TEST - should register ERROR: ', err);
        console.log('SERVER USER UNIT TEST - should register RESULTS: ', results);
        expect(err).to.be.null;
        expect(results).to.be.ok;
        // expect(results).to.be.above(0);
        expect(results).to.have.property('id');
        done();
      });
    });
    it('should NOT register a new User - duplicate user', function(done){
      User.register({username:'bob', email:'bob@boberson.com', password:'123456'}, function(err, results){
        // console.log('SERVER USER UNIT TEST - should NOT register ERROR: ', err);
        // console.log('SERVER USER UNIT TEST - should NOT register RESULTS: ', results);
        expect(err).to.be.ok;
        done();
      });
    });
  });

  describe('.login', function(){
    it('should login a User', function(done){
      User.login({username:'bob', password:'123456'}, function(user){
        expect(user.username).to.equal('bob');
        done();
      });
    });
    it('should NOT login a User - wrong username', function(done){
      User.login({username:'wrong', password:'123456'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
    it('should NOT login a User - wrong password', function(done){
      User.login({username:'bob', password:'wrong'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
  });
});
