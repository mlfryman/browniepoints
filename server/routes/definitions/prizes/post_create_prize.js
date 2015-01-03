'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Create a Prize',
  tags:['prizes'],
  validate: {
    payload: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      cost: Joi.number().min(1).required(),
      tags: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Prize.create(request.auth.credentials, request.payload, function(err, prizeId){
      reply({prizeId:prizeId}).code(err ? 400 : 200);
    });
  }
};
