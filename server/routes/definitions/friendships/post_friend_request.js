/* jshint camelcase:false */

'use strict';

var Joi  = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Send a friend request to a User',
  tags:['users','friendships'],
  validate: {
    payload: {
      friend2Id: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    request.payload.friend1Id = request.auth.credentials.id;
    Friendship.request(request.payload, function(err){
      if(err){console.log('CLIENT FRIENDSHIP CTRL - Friendship.request ERROR: ', err);}
      reply().code(err ? 400 : 200);
    });
  }
};

