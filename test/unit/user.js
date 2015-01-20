/* jshint expr:true, camelcase:false */

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
      var user = new User({first_name:'Han', last_name:'Solo', username:'solo', email:'han@solo.io'});

      expect(user).to.be.instanceof(User);
      expect(user.first_name).to.equal('Han');
      expect(user.last_name).to.equal('Solo');
      expect(user.username).to.equal('solo');
      expect(user.email).to.equal('han@solo.io');
      done();
    });
  });

  describe('.register', function(){
    it('should register a new User', function(done){
      User.register({first_name:'Frank', last_name:'Frankerson', username:'frank', email:'frank@frank.com', password:'456789'}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        expect(results).to.have.property('id');
        done();
      });
    });
    it('should NOT register a new User - duplicate user', function(done){
      User.register({first_name:'Han', last_name:'Solo', username:'solo', email:'han@solo.io', password:'123456'}, function(err, results){
        expect(err).to.be.ok;
        done();
      });
    });
  });

  describe('.login', function(){
    it('should login a User', function(done){
      User.login({username:'solo', password:'123456'}, function(user){
        expect(user.username).to.equal('solo');
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
      User.login({username:'solo', password:'wrong'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
  });

  describe('.findByEmail', function(){
    it('should find a User by email', function(done){
      User.findByEmail('chewie@bacca.com', function(err, results){
        expect(err).to.be.null;
        expect(results.id).to.equal(2);
        done();
      });
    });
    it('should NOT find a User - email does not exist', function(done){
      User.findByEmail('steve@fryman.io', function(err, results){
        expect(results).to.be.undefined;
        done();
      });
    });
  });
});
