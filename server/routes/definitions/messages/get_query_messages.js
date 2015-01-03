'use strict';

var Joi  = require('joi'),
    Message = require('../../../models/message');

module.exports = {
  description: 'Query Messages',
  tags:['messages'],
  validate: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      tag: Joi.string()
    }
  },
  // allows us to test mobile app
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Message.query(request.auth.credentials, request.query, function(err, messages){
      reply({messages:messages}).code(err ? 400 : 200);
    });
  }
};

