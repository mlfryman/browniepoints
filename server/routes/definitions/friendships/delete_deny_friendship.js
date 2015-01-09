'use strict';

var Joi        = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Delete a Friendship request',
  tags:['friendships'],
  validate: {
    params: {
      friendshipId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Friendship.deny(request.params.friendshipId, function(err, friendshipId){
      if(err){console.log('SERVER FRIENDSHIP CTRL - Friendship.deny ERROR: ', err);}
      reply({friendshipId:friendshipId}).code(err ? 400 : 200);
    });
  }
};

