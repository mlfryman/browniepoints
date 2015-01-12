'use strict';

var Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get all pending Friendships',
  tags:['friendships'],
  handler: function(request, reply){
    Friendship.pending(request.auth.credentials, function(err, results){
      if(err){console.log('SERVER FRIENDSHIP CTRL - Friendship.pending ERROR: ', err);}
      console.log('SERVER FRIENDSHIP CTRL - .pending RESULTS: ', results);
      reply(results).code(err ? 400 : 200);
    });
  }
};
