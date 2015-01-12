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

module.exports = Prize;
