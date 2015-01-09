/* jshint expr:true, camelcase:false */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    Friendship = require('../../server/models/friendship'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getDB();

describe('Friendship', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Friendship object', function(done){
      var f = new Friendship();
      expect(f).to.be.instanceof(Friendship);
      done();
    });
  });

  describe('.request', function(){
    it('should create a friend request', function(done){
      Friendship.request({friend1Id:1, friend2Id:2}, function(err, results){
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT create a friend request - user does not exist', function(done){
      Friendship.request({friend1Id:1, friend2Id:9}, function(err, results){
        expect(err).to.be.ok;
        done();
      });
    });
  });

   describe('.pending', function(){
    it('should get all pending friend requests by User', function(done){
      Friendship.pending(1, function(err, results){
        expect(err).to.be.null;
       done();
      });
    });
    it('should NOT get all pending friend requests by User - no pending requests', function(done){
      Friendship.pending(2, function(err, results){
        expect(results).to.be.empty;
        done();
      });
    });
  });

  describe('.accept', function(){
    it('should accept a pending friend request', function(done){
      Friendship.accept(13, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
       done();
      });
    });
    it('should NOT accept a pending friend request - wrong friendshipId', function(done){
      Friendship.accept(99, function(err, results){
        expect(results).to.be.empty;
        done();
      });
    });
  });

  describe('.deny', function(){
    it('should deny a pending friend request', function(done){
      Friendship.deny(14, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
    it('should NOT deny a pending friend request - wrong friendshipId', function(done){
      Friendship.deny(99, function(err, results){
        expect(results).to.be.empty;
        done();
      });
    });
  });
});
