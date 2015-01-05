/* jshint camelcase:false */

'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register a User',
  tags:['users'],
  validate: {
    payload: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      username: Joi.string().min(3).max(20).required(),
      email:    Joi.string().required(),
      password: Joi.string().min(6).required()
    }
  },
  auth: false,
  handler: function(request, reply){
    User.register(request.payload, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};
