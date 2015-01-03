'use strict';

var Joi  = require('joi'),
    Message = require('../../../models/message');

module.exports = {
  description: 'Show a Message',
  tags:['messages'],
  validate: {
    params: {
      messageId: Joi.number().required()
    }
  },
  // allows us to test mobile app
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Message.show(request.auth.credentials, request.params.messageId, function(err, message){
      reply(message).code(err ? 404 : 200);
    });
  }
};

