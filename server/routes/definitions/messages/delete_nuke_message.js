'use strict';

var Joi  = require('joi'),
    Message = require('../../../models/message');

module.exports = {
  description: 'Delete a Message',
  tags:['messages'],
  validate: {
    params: {
      messageId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Message.nuke(request.auth.credentials, request.params.messageId, function(err, messageId){
      reply({messageId:messageId}).code(err ? 400 : 200);
    });
  }
};

