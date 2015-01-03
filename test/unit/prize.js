/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    fs         = require('fs'),
    h          = require('../helpers/helpers'),
    Prize      = require('../../server/models/prize'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getDB();

describe('Prize', function(){
  var prizeId;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      Prize.create({id:1}, {title:'a',description:'b',cost:1,tags:'c,d,e'}, function(err, results){
        prizeId = results;
        done();
      });
    });
  });

  describe('constructor', function(){
    it('should create a new Prize object', function(done){
      var p = new Prize();
      expect(p).to.be.instanceof(Prize);
      done();
    });
  });

  describe('.create', function(){
    it('should create a prize', function(done){
      Prize.create({id:1}, {title:'a',description:'b',cost:1,tags:'c,d,e'}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.above(0);
        done();
      });
    });
  });

  describe('.show', function(){
    it('should show a prize', function(done){
      Prize.show({id:1}, prizeId, function(err, results){
        expect(err).to.be.null;
        expect(results.title).to.equal('a');
        done();
      });
    });
  });

  describe('.nuke', function(){
    it('should nuke a prize', function(done){
      Prize.nuke({id:1}, prizeId, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal(prizeId);
        done();
      });
    });
  });

  describe('.count', function(){
    it('should count prizes from a user', function(done){
      Prize.count({id:1}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal('1');
        done();
      });
    });
  });

  describe('.query', function(){
    it('should query prizes from a user', function(done){
      Prize.query({id:1}, {}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
  });

  describe('.upload', function(){
    it('should upload an image for the prize avatar', function(done){
      var file = fs.createReadStream(__dirname + '/../fixtures/flag.png');
      Prize.upload({token:'tok'}, file, 'flag.png', prizeId, function(err, results){
        expect(err).to.be.null;
        done();
      });
    });
  });
});
