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

describe('Friendships', function(){
  var cookie, fid, friend2Id_a = 4, friend2Id_b = 9, friendshipId = 12;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'POST',
        url: '/login',
        payload: {
          username: 'solo',
          password: '123456'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
          fid = response.result.fid;
          done();
        });
    });
  });

  describe('POST /friends/request/{friend2Id}', function(){
    it('should create a friend request', function(done){
      var options = {
        method: 'POST',
        url: '/friends/request/' + friend2Id_a,
        params:{
          friend2Id: 4
        },
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT create a friend request - friend does not exist', function(done){
      var options = {
        method: 'POST',
        url: '/friends/request/' + friend2Id_b,
        params: {
          friend2Id: 9
        },
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe('GET /friends/pending', function(){
    it('should get pending friend requests for a User', function(done){
      var options = {
        method: 'GET',
        url: '/friends/pending',
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.pending).to.have.length(1);
        done();
      });
    });
    it('should NOT get pending friend requests for a User - missing credentials', function(done){
      var options = {
        method: 'GET',
        url: '/friends/pending'
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('GET /friends', function(){
    it('should get all friendships for a User', function(done){
      var options = {
        method: 'GET',
        url: '/friends',
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.friendships).to.have.length(1);
        done();
      });
    });
    it('should NOT get all friendships for a User - missing credentials', function(done){
      var options = {
        method: 'GET',
        url: '/friends'
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('GET /friends/13', function(){
    it('should get a friendship by ID for a User', function(done){
      var options = {
        method: 'GET',
        url: '/friends/' + friendshipId,
        params:{
          friendshipId: 12
        },
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT get a friendship by ID for a User - friendship is pending approval', function(done){
      var options = {
        method: 'GET',
        url: '/friends/' + 13,
        params: {
          friendshipId: 13
        },
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
// last bracket
});

// FRIENDSHIPS ROUTES
  // {method: 'PUT',    path: '/friends/{friendshipId}/accept',  config: require('../definitions/friendships/put_accept_friendship')},
  // {method: 'DELETE', path: '/friends/{friendshipId}/deny',    config: require('../definitions/friendships/delete_deny_friendship')},
  // {method: 'GET',    path: '/friends/{friendshipId}',         config: require('../definitions/friendships/get_show_friendship')},
