// /* jshint expr:true, camelcase:false  */

// 'use strict';

// var expect     = require('chai').expect,
//     cp         = require('child_process'),
//     h          = require('../helpers/helpers'),
//     server     = require('../../server/index'),
//     Lab        = require('lab'),
//     lab        = exports.lab = Lab.script(),
//     describe   = lab.describe,
//     it         = lab.it,
//     beforeEach = lab.beforeEach,
//     db         = h.getDB();

// describe('Prizes', function(){
//   var cookie, prizeId, friendshipId = 12;

//   beforeEach(function(done){
//     cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
//       var options1 = {
//         method: 'POST',
//         url: '/login',
//         payload: {
//           username: 'solo',
//           password: '123456'
//         }
//       };

//       server.inject(options1, function(response){
//         cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
//         var options2 = {
//           method: 'POST',
//           url: '/friends/' + friendshipId + '/prizes',
//           payload: {
//             owner_id:1,
//             from_id:1,
//             to_id:2,
//             title:'a',
//             description:'b',
//             category:1,
//             cost:10
//           },
//           headers:{
//             cookie:cookie
//           }
//         };

//         server.inject(options2, function(response){
//           prizeId = response.result.prizeId;
//           done();
//         });
//       });
//     });
//   });

//   describe('POST /friends/12/prizes', function(){
//     it('should create a prize', function(done){
//       var options = {
//         method: 'POST',
//         url: '/friends/' + friendshipId + '/prizes',
//         payload: {
//           owner_id:1,
//           from_id:1,
//           to_id:2,
//           title:'a',
//           description:'b',
//           category:1,
//           cost:10
//         },
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });
//     it('should NOT create a prize - missing title', function(done){
//       var options = {
//         method: 'POST',
//         url: '/friends/' + friendshipId + '/prizes',
//         payload: {
//           owner_id:1,
//           from_id:1,
//           to_id:2,
//           title:'a',
//           description:'b',
//           category:1,
//           cost:10
//         },
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(400);
//         done();
//       });
//     });
//   });

//   describe('GET /friends/12/prizes', function(){
//     it('should find all Prizes for a Friendship', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friends/' + friendshipId + '/prizes',
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         expect(response.result.prizes).to.have.length(1);
//         done();
//       });
//     });
//     it('should NOT find all Prizes for a Friendship - Friendship does not exist', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friends/' + friendshipId + '/prizes'
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(401);
//         done();
//       });
//     });
//   });

//   describe('DELETE /friends/12/prizes/prizeId', function(){
//     it('should delete a prize', function(done){
//       var options = {
//         method: 'DELETE',
//         url: '/friends/' + friendshipId + '/prizes/' + prizeId,
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });
//     it('should NOT delete a prize - missing prizeId', function(done){
//       var options = {
//         method: 'DELETE',
//         url: '/friends/' + friendshipId + '/prizes/',
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(404);
//         done();
//       });
//     });
//   });
// });
