'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Delete a Prize',
  tags:['prizes'],
  validate: {
    params: {
      friendshipId: Joi.number().min(1).required(),
      prizeId: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    Prize.nuke(request.params.friendshipId, request.params.prizeId, function(err, prizeId){
      if(err){console.log('SERVER PRIZE CTRL - Prize.nuke ERROR: ', err);}
      reply({prizeId:prizeId}).code(err ? 400 : 200);
    });
  }
};
