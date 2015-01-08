// /* jshint expr:true */

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

// describe('Friendships', function(){
//   var cookie, friendshipId;

//   beforeEach(function(done){
//     cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
//       var options1 = {
//         method: 'POST',
//         url: '/login',
//         payload: {
//           username: 'bob',
//           password: '123456'
//         }
//       };

//       server.inject(options1, function(response){
//         cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
//         var options2 = {
//           method: 'POST',
//           url: '/friendships',
//           payload: {
//             title: 'a',
//             description: 'b',
//             cost: 1,
//             tags: 'c,d,e'
//           },
//           headers:{
//             cookie:cookie
//           }
//         };

//         server.inject(options2, function(response){
//           friendshipId = response.result.friendshipId;
//           done();
//         });
//       });
//     });
//   });

//   describe('POST /friends/request', function(){
//     it('should create a friend request', function(done){
//       var options = {
//         method: 'POST',
//         url: '/friends/request',
//         payload: {
//           friend2Id: 2
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
//     it('should NOT create a friend request - friend does not exist', function(done){
//       var options = {
//         method: 'POST',
//         url: '/friends/requests',
//         payload: {
//           friend2Id: 9
//         },
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
