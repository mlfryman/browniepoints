'use strict';

var Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get all Friendships for a User',
  tags:['friendships'],
  handler: function(request, reply){
    Friendship.findAll(request.auth.credentials, function(err, results){
      if(err){console.log('SERVER FRIENDSHIP CTRL - .findAll ERROR: ', err);}
      reply(results).code(err ? 400 : 200);
    });
  }
};
