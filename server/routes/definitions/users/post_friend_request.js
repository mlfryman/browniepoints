/* jshint camelcase:false */

'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Send a friend request to a User',
  tags:['users','friends'],
  validate: {
    payload: {
      friendId: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    request.payload.userId = request.auth.credentials.id;
    User.friendRequest(request.payload, function(err){
      if(err){console.log('SERVER ERROR - USER CTRL User.friendRequest ERROR: ', err);}
      reply().code(err ? 400 : 200);
    });
  }
};

