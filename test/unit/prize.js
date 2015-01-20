// /* jshint expr:true, camelcase:false */

// 'use strict';

// var expect     = require('chai').expect,
//     cp         = require('child_process'),
//     h          = require('../helpers/helpers'),
//     Prize      = require('../../server/models/prize'),
//     Lab        = require('lab'),
//     lab        = exports.lab = Lab.script(),
//     describe   = lab.describe,
//     it         = lab.it,
//     beforeEach = lab.beforeEach,
//     db         = h.getDB();

// describe('Prize', function(){
//   var prizeId;

//   beforeEach(function(done){
//     cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
//       Prize.create(12, {owner_id:1,from_id:1,to_id:2,title:'a',description:'b',category:1,cost:10}, function(err, results){
//         prizeId = results;
//         done();
//       });
//     });
//   });

//   describe('constructor', function(){
//     it('should create a new Prize object', function(done){
//       var p = new Prize();
//       expect(p).to.be.instanceof(Prize);
//       done();
//     });
//   });

//   describe('.create', function(){
//     it('should create a prize', function(done){
//       Prize.create(12, {owner_id:1,from_id:1,to_id:2,title:'a',description:'b',category:1,cost:10}, function(err, results){
//         expect(err).to.be.null;
//         expect(results).to.be.above(0);
//         done();
//       });
//     });
//   });

//   describe('.categories', function(){
//     it('should get all prize categories', function(done){
//       Prize.categories({}, {}, function(err, results){
//         expect(err).to.be.null;
//         expect(results).to.be.above(0);
//         done();
//       });
//     });
//   });

//   describe('.nuke', function(){
//     it('should nuke a prize', function(done){
//       Prize.nuke(12, prizeId, function(err, results){
//         expect(err).to.be.null;
//         expect(results).to.equal(prizeId);
//         done();
//       });
//     });
//   });

//   describe('.findAll', function(){
//     it('should find all prizes for a Friendship', function(done){
//       Prize.query(12, {}, function(err, results){
//         expect(err).to.be.null;
//         expect(results).to.have.length(1);
//         done();
//       });
//     });
//   });
// });
