/* jshint camelcase:false */

'use strict';

var Joi        = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Reward a Friend by adding points',
  tags:['friendships', 'transactions'],
  validate: {
    params: {
      friendshipId: Joi.number().required()
    },
    payload: {
      to_id: Joi.number().min(1).required(),
      body: Joi.string().required(),
      points: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    request.payload.from_id = request.auth.credentials.id;
    Friendship.reward(request.params.friendshipId, request.payload, function(err){
      if(err){console.log('SERVER FRIENDSHIP CTRL - Friendship.reward ERROR: ', err);}
      reply().code(err ? 400 : 200);
    });
  }
};

