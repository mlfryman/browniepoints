'use strict';

var Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get all pending Friendships',
  tags:['friendships'],
  handler: function(request, reply){
    Friendship.pending(request.auth.credentials, function(err, pending){
      if(err){console.log('SERVER FRIENDSHIP CTRL - Friendship.pending ERROR: ', err);}
      reply({pending:pending}).code(err ? 400 : 200);
    });
  }
};

