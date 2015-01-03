'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Query Prizes',
  tags:['prizes'],
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
    Prize.query(request.auth.credentials, request.query, function(err, prizes){
      reply({prizes:prizes}).code(err ? 400 : 200);
    });
  }
};

