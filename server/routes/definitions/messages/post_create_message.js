'use strict';

var Joi  = require('joi'),
    Message = require('../../../models/message');

module.exports = {
  description: 'Create a Message',
  tags:['messages'],
  validate: {
    payload: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      cost: Joi.number().min(1).required(),
      tags: Joi.string().required()
    }
  },
  handler: function(request, reply){
    Message.create(request.auth.credentials, request.payload, function(err, messageId){
      reply({messageId:messageId}).code(err ? 400 : 200);
    });
  }
};
