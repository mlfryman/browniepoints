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
      Friendship.request({friend1Id:1, friend2Id:4}, function(err, fid){
        console.log('FRIENDSHIP UNIT TEST - Friendship.request ERROR: ', err);
        console.log('FRIENDSHIP UNIT TEST - Friendship.request FID: ', fid);
        expect(err).to.be.null;
        expect(fid).to.equal(14);
        done();
      });
    });
    it('should NOT create a friend request - user does not exist', function(done){
      Friendship.request({friend1Id:1, friend2Id:9}, function(err, fid){
        console.log('FRIENDSHIP UNIT TEST - NOT Friendship.request ERROR: ', err);
        console.log('FRIENDSHIP UNIT TEST - NOT Friendship.request FID: ', fid);
        expect(err).to.be.ok;
        done();
      });
    });
  });

   describe('.pending', function(){
    it('should get all pending friend requests by User', function(done){
      Friendship.pending({id:1}, function(err, results){
        expect(err).to.be.null;
       done();
      });
    });
    it('should NOT get all pending friend requests by User - bad userId', function(done){
      Friendship.pending(99, function(err, results){
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
      Friendship.deny(13, function(err, results){
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

  describe('.findAll', function(){
    it('should find all Friendships for a User', function(done){
      Friendship.findAll({id:1}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
    it('should NOT find all Friendships for a User - wrong friendshipId', function(done){
      Friendship.findAll({id:99}, function(err, results){
        expect(results).to.be.empty;
        done();
      });
    });
  });
  describe('.findOne', function(){
    it('should find one Friendship by ID', function(done){
      Friendship.findOne({id:1}, 12, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.property('name');
        done();
      });
    });
    it('should NOT find a Friendship by ID - bad friendshipId', function(done){
      Friendship.findOne({id:1}, 99, function(err, results){
        expect(results).to.be.empty;
        done();
      });
    });
  });

  describe('.reward', function(){
    it('should create a reward transaction for a Friend', function(done){
      Friendship.reward(12, {from_id:1, to_id:2, body:'a', points:5}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.property('id');
        done();
      });
    });
    it('should NOT create a reward transaction for a Friend - body missing', function(done){
      Friendship.reward(12, {from_id:1, to_id:2, points:1}, function(err, results){
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.punish', function(){
    it('should create a punish transaction for a Friend', function(done){
      Friendship.reward(12, {from_id:1, to_id:2, body:'a', points:-5}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.property('id');
        done();
      });
    });
    it('should NOT create a punish transaction for a Friend - to_id missing', function(done){
      Friendship.reward(12, {from_id:1, body:'a',points:1}, function(err, results){
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.findAllTransactions', function(){
    it('should find all transactions for a Friendship', function(done){
      Friendship.findAllTransactions(12, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
    it('should NOT find all transactions for a Friendship - bad friendship id', function(done){
      Friendship.findAllTransactions(99, function(err, results){
        expect(results).to.be.empty;
        done();
      });
    });
  });

  describe('.myWallet', function(){
    it('should calculate the sum of a User\'s wallet per Friendship', function(done){
      Friendship.myWallet(12, 1, function(err, myWallet){
        expect(err).to.be.null;
        expect(myWallet).to.equal('20');
        done();
      });
    });
    it('should NOT calculate the sum of a User\'s wallet per Friendship - bad friendship id', function(done){
      Friendship.myWallet(16, 1, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });

  describe('.friendWallet', function(){
    it('should calculate the sum of a Friend\'s wallet per Friendship', function(done){
      Friendship.friendWallet(12, 2, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.ok;
        done();
      });
    });
    it('should NOT calculate the sum of a Friend\'s wallet per Friendship - bad friendship id', function(done){
      Friendship.friendWallet(26, 2, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.null;
        done();
      });
    });
  });
});
