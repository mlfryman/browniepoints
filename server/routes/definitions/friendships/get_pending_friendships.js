'use strict';

var Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get all pending Friendships',
  tags:['friendships'],
  handler: function(request, reply){
    request.payload.userId = request.auth.credentials.id;
    Friendship.pending(request.payload, function(err, pending){
      if(err){console.log('SERVER USER CTRL - Friendship.pending ERROR: ', err);}
      if(err){console.log('SERVER USER CTRL - Friendship.pending PENDING: ', pending);}
      reply({pending:pending}).code(err ? 400 : 200);
    });
  }
};
