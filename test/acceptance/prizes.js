/* jshint expr:true */

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

describe('Prizes', function(){
  var cookie, prizeId;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options1 = {
        method: 'POST',
        url: '/login',
        payload: {
          username: 'bob',
          password: '123456'
        }
      };

      server.inject(options1, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        var options2 = {
          method: 'POST',
          url: '/prizes',
          payload: {
            title: 'a',
            description: 'b',
            cost: 1,
            tags: 'c,d,e'
          },
          headers:{
            cookie:cookie
          }
        };

        server.inject(options2, function(response){
          prizeId = response.result.prizeId;
          done();
        });
      });
    });
  });

  describe('POST /prizes', function(){
    it('should create a prize', function(done){
      var options = {
        method: 'POST',
        url: '/prizes',
        payload: {
          title: 'a',
          description: 'b',
          cost: 1,
          tags: 'c,d,e'
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
    it('should NOT create a prize - missing title', function(done){
      var options = {
        method: 'POST',
        url: '/prizes',
        payload: {
          description: 'b',
          cost: 1,
          tags: 'c,d,e'
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

  describe('GET /prizes', function(){
    it('should get prizes', function(done){
      var options = {
        method: 'GET',
        url: '/prizes',
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.prizes).to.have.length(1);
        done();
      });
    });
    it('should NOT get prizes - user logged out', function(done){
      var options = {
        method: 'GET',
        url: '/prizes'
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('GET /prizes/count', function(){
    it('should get prizes count', function(done){
      var options = {
        method: 'GET',
        url: '/prizes/count',
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.count).to.equal('1');
        done();
      });
    });
    it('should NOT get prizes count - user logged out', function(done){
      var options = {
        method: 'GET',
        url: '/prizes/count'
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(401);
        done();
      });
    });
  });


  describe('GET /prizes/3', function(){
    it('should show a prize', function(done){
      var options = {
        method: 'GET',
        url: '/prizes/' + prizeId,
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT show a prize - invalid prizeId', function(done){
      var options = {
        method: 'GET',
        url: '/prizes/',
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        //- expect status = prize NOT FOUND
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('DELETE /prizes/3', function(){
    it('should delete a prize', function(done){
      var options = {
        method: 'DELETE',
        url: '/prizes/' + prizeId,
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('should NOT delete a prize - missing prizeId', function(done){
      var options = {
        method: 'DELETE',
        url: '/prizes/',
        headers:{
          cookie:cookie
        }
      };

      server.inject(options, function(response){
        //- expect status = prize NOT FOUND
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
