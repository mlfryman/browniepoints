/* jshint camelcase:false */

'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Create a Prize',
  tags:['prizes'],
  validate: {
    params: {
      friendshipId: Joi.number().required()
    },
    payload: {
      to_id: Joi.number().min(1).required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      category_id: Joi.number().min(1).required(),
      cost: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    request.payload.owner_id = request.auth.credentials.id;
    request.payload.from_id = request.auth.credentials.id;
    Prize.create(request.params.friendshipId, request.payload, function(err, prizeId){
      if(err){console.log('SERVER PRIZE CREATE CTRL - Prize.create ERROR: ', err);}
      reply({prizeId:prizeId}).code(err ? 400 : 200);
    });
  }
};
