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

//   describe('POST /friendships', function(){
//     it('should create a friendship', function(done){
//       var options = {
//         method: 'POST',
//         url: '/friendships',
//         payload: {
//           title: 'a',
//           description: 'b',
//           cost: 1,
//           tags: 'c,d,e'
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
//     it('should NOT create a friendship - missing title', function(done){
//       var options = {
//         method: 'POST',
//         url: '/friendships',
//         payload: {
//           description: 'b',
//           cost: 1,
//           tags: 'c,d,e'
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

//   describe('GET /friendships', function(){
//     it('should get friendships', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friendships',
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         expect(response.result.friendships).to.have.length(1);
//         done();
//       });
//     });
//     it('should NOT get friendships - user logged out', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friendships'
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(401);
//         done();
//       });
//     });
//   });

//   describe('GET /friendships/count', function(){
//     it('should get friendships count', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friendships/count',
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         expect(response.result.count).to.equal('1');
//         done();
//       });
//     });
//     it('should NOT get friendships count - user logged out', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friendships/count'
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(401);
//         done();
//       });
//     });
//   });


//   describe('GET /friendships/3', function(){
//     it('should show a friendship', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friendships/' + friendshipId,
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });
//     it('should NOT show a friendship - invalid friendshipId', function(done){
//       var options = {
//         method: 'GET',
//         url: '/friendships/',
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

//   describe('DELETE /friendships/3', function(){
//     it('should delete a friendship', function(done){
//       var options = {
//         method: 'DELETE',
//         url: '/friendships/' + friendshipId,
//         headers:{
//           cookie:cookie
//         }
//       };

//       server.inject(options, function(response){
//         expect(response.statusCode).to.equal(200);
//         done();
//       });
//     });
//     it('should NOT delete a friendship - missing friendshipId', function(done){
//       var options = {
//         method: 'DELETE',
//         url: '/friendships/',
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
