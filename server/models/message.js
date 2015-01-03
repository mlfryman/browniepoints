/* jshint camelcase:false */

'use strict';

var pg     = require('../postgres/manager');

function Message(){
}

Message.create = function(user, obj, cb){
  var psqlString = 'SELECT add_message($1, $2, $3, $4, $5)',
      psqlParams = [user.id, obj.title, obj.description, obj.cost, obj.tags];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].add_message : null);
  });
};

Message.query = function(user, query, cb){
  var psqlString = 'SELECT * FROM query_messages($1, $2, $3, $4)',
      psqlParams = [user.id, query.limit || 10, query.offset || 0, query.tag || '%'];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Message.show = function(user, messageId, cb){
  var psqlString = 'SELECT * FROM show_message($1, $2)',
      psqlParams = [user.id, messageId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0] : null);
  });
};

Message.count = function(user, cb){
  var psqlString = 'SELECT COUNT(*) FROM messages WHERE user_id = $1',
      psqlParams = [user.id];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].count : null);
  });
};

Message.nuke = function(user, messageId, cb){
  var psqlString = 'SELECT nuke_message($1, $2)',
      psqlParams = [user.id, messageId];
  pg.query(psqlString, psqlParams, function(err, results){
    cb(err, results && results.rows ? results.rows[0].nuke_message : null);
  });
};

module.exports = Message;
