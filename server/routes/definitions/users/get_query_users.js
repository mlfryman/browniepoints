'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Query Users',
  tags:['users', 'query'],
  validate: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      email: Joi.string()
    }
  },
  handler: function(request, reply){
    User.query(request.auth.credentials, request.query, function(err, users){
      reply({users:users}).code(err ? 400 : 200);
    });
  }
};
