'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register a User',
  tags:['users'],
  validate: {
    payload: {
      username: Joi.string().min(3).max(12).required(),
      email:    Joi.string().required(),
      password: Joi.string().min(3).required()
    }
  },
  auth: false,
  handler: function(request, reply){
    // console.log('SERVER HAPI REGISTER - request: ', request);
    // console.log('SERVER HAPI REGISTER - reply: ', reply);
    User.register(request.payload, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};
