'use strict';

var Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get all pending Friendships',
  tags:['friendships'],
  handler: function(request, reply){
    // console.log('SERVER FRIENDSHIP CTRL - Friendship.pending request: ', request);
    console.log('SERVER FRIENDSHIP CTRL - Friendship.pending reply: ', reply);
    console.log('SERVER FRIENDSHIP CTRL - Friendship.pending request.payload: ', request.payload);
    // request.payload.userId = request.auth.credentials.id;
    Friendship.pending(request.auth.credentials, function(err, friendships){
      console.log('SERVER FRIENDSHIP CTRL - Friendship.pending FRIENDSHIPS: ', friendships);
      if(err){console.log('SERVER FRIENDSHIP CTRL - Friendship.pending ERROR: ', err);}
      reply({friendships:friendships}).code(err ? 400 : 200);
    });
  }
};
