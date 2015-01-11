'use strict';

var Joi        = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Show a Friendship',
  tags:['friendships'],
  validate: {
    params: {
      friendshipId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Friendship.findOne(request.auth.credentials, request.params.friendshipId, function(err, friendship){
      reply(friendship).code(err ? 404 : 200);
    });
  }
};
