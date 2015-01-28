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
  var cookie, fid, friend2Id_a = 4, friend2Id_b = 9;

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
        console.log('FRIENDSHIP ACCEPTANCE TEST - Friendship.request OPTIONS: ', options);
        console.log('FRIENDSHIP ACCEPTANCE TEST - Friendship.request RESPONSE: ', response);
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
        console.log('FRIENDSHIP ACCEPTANCE TEST - NOT Friendship.request RESPONSE: ', response);
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
});
