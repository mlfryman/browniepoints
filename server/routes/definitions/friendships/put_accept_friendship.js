'use strict';

var Joi        = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Accept a Friendship request',
  tags:['friendships'],
  validate: {
    params: {
      friendshipId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Friendship.accept(request.params.friendshipId, function(err, friendshipId){
      if(err){console.log('SERVER FRIENDSHIP CTRL - Friendship.accept ERROR: ', err);}
      reply({friendshipId:friendshipId}).code(err ? 400 : 200);
    });
  }
};
