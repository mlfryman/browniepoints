'use strict';

var Joi   = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Find all Prizes in a Friendship',
  tags:['prizes', 'friendships'],
  validate: {
    params: {
      friendshipId: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    Prize.findAll(request.params.friendshipId, function(err, prizes){
      if(err){console.log('SERVER PRIZE CTRL - Prize.findAll ERROR: ', err);}
      reply({prizes:prizes}).code(err ? 400 : 200);
    });
  }
};

