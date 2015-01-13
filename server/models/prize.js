/* jshint camelcase:false */

'use strict';

var pg = require('../postgres/manager');

function Prize(){
}

Prize.create = function(friendshipId, obj, cb){
  var psqlString = 'SELECT add_prize($1, $2, $3, $4, $5, $6, $7, $8)',
      psqlParams = [friendshipId, obj.owner_id, obj.from_id, obj.to_id, obj.title, obj.description, obj.category_id, obj.cost];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].add_prize : null);
  });
};

Prize.categories = function(cb){
  var psqlString = 'SELECT * FROM find_categories()',
      psqlParams = [];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Prize.findAll = function(friendshipId, cb){
  var psqlString = 'SELECT * FROM find_all_prizes($1)',
      psqlParams = [friendshipId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Prize.nuke = function(friendshipId, prizeId, cb){
  var psqlString = 'SELECT nuke_prize($1, $2)',
      psqlParams = [friendshipId, prizeId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].nuke_note : null);
  });
};

Prize.buy = function(friendshipId, prize, cb){
  var p = prize,
      t = {};
  t.prizeId = p.prizeId;
  t.friendshipId = p.friendshipId;
  t.fromId = p.toId;
  t.toId = p.fromId;
  t.body = p.toUsername.toUpperCase() + ' is cashing in ' + p.title.toUpperCase() +  ' for ' + p.cost + ' points. Time to pay up, ' + p.fromUsername.toUpperCase() + '!';
  t.points = (p.cost * -1);
  console.log('t.fromId :: p.toId = ', t.fromId, p.toId);
  console.log('SERVER PRIZE MODEL - .buy @params p: ', p);
  var psqlString = 'SELECT buy_prize($1, $2, $3, $4, $5, $6)',
      psqlParams = [t.prizeId, friendshipId, t.toId, t.fromId, t.body, t.points];
      console.log('SERVER PRIZE MODEL - .buy @params PSQLPARAMS: ', psqlParams);
  pg.query(psqlString, psqlParams, function(err, results){
    // console.log('SERVER PRIZE MODEL - .buy ERROR: ', err);
    // console.log('SERVER PRIZE MODEL - .buy RESULTS: ', results);
    cb(err, results && results.rows ? results.rows : null);
  });
};

module.exports = Prize;
