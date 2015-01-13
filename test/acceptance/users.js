/* jshint expr:true, camelcase:false */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    server     = require('../../server/index'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getDB();

describe('Users', function(){
  var cookie;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'POST',
        url: '/login',
        payload: {
          username: 'bob',
          password: '123456'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('POST /register', function(){
    it('should register a new User', function(done){
      var options = {
        method: 'POST',
        url: '/register',
        payload: {
          first_name:'Frank',
          last_name:'Frankerson',
          username: 'frank',
          email: 'frank@frank.com',
          password: '456789'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT register a new User - duplicate', function(done){
      var options = {
        method: 'POST',
        url: '/register',
        payload: {
          first_name: 'Bob',
          last_name: 'Boberson',
          username: 'bob',
          email: 'bob@boberson.com',
          password: '123456'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('POST /login', function(){
    it('should login a User', function(done){
      var options = {
        method: 'POST',
        url: '/login',
        payload: {
          username: 'bob',
          password: '123456'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('bob');
        done();
      });
    });
    it('should NOT login a User - user does not exist', function(done){
      var options = {
        method: 'POST',
        url: '/login',
        payload: {
          username: 'sally',
          password: '987654'
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('DELETE /logout', function(){
    it('should logout a User', function(done){
      var options = {
        method: 'DELETE',
        url: '/logout',
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /status', function(){
    it('should get a status for a User', function(done){
      var options = {
        method: 'GET',
        url: '/status',
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
