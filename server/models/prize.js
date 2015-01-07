/* jshint camelcase:false */

'use strict';

var AWS    = require('aws-sdk'),
    crypto = require('crypto'),
    concat = require('concat-stream'),
    path   = require('path'),
    pg     = require('../postgres/manager');

function Prize(){
}

Prize.create = function(user, obj, cb){
  var psqlString = 'SELECT add_prize($1, $2, $3, $4, $5)',
      psqlParams = [user.id, obj.title, obj.description, obj.cost, obj.tags];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].add_prize : null);
  });
};

Prize.query = function(user, query, cb){
  var psqlString = 'SELECT * FROM query_prizes($1, $2, $3, $4)',
      psqlParams = [user.id, query.limit || 10, query.offset || 0, query.tag || '%'];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Prize.show = function(user, prizeId, cb){
  var psqlString = 'SELECT * FROM show_prize($1, $2)',
      psqlParams = [user.id, prizeId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Prize.count = function(user, cb){
  var psqlString = 'SELECT COUNT(*) FROM prizes WHERE user_id = $1',
      psqlParams = [user.id];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].count : null);
  });
};

Prize.nuke = function(user, prizeId, cb){
  var psqlString = 'SELECT nuke_prize($1, $2)',
      psqlParams = [user.id, prizeId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].nuke_prize : null);
  });
};

Prize.upload = function(user, file, name, prizeId, cb){
  var s3 = new AWS.S3();

  crypto.randomBytes(48, function(ex, buf){
    var hex        = buf.toString('hex'),
        loc        = user.token + '/' + prizeId + '/' + hex + path.extname(name),
        url        = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc,
        psqlString = 'INSERT INTO images (url, prize_id) VALUES ($1, $2) RETURNING id',
        psqlParams = [url, prizeId];

    pg.query(psqlString, psqlParams, function(err, results){
      if(err){return cb(err);}

      file.pipe(concat(function(buf){
        var params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: buf, ACL: 'public-read'};
        s3.putObject(params, cb);
      }));
    });
  });
};

module.exports = Prize;
