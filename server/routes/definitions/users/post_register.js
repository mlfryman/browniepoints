'use strict';

var Joi  = require('joi'),
    User = require('../../../models/user');

module.exports = {
  description: 'Register a User',
  tags:['users'],
  validate: {
    payload: {
      username: Joi.string().min(3).max(20).required(),
      email:    Joi.string().required(),
      password: Joi.string().min(6).required()
    }
  },
  auth: false,
  handler: function(request, reply){
    console.log('SERVER USER CTRL - post_register REQUEST: ', request);
    console.log('SERVER USER CTRL - post_register REPLY: ', reply);
    User.register(request.payload, function(err){
      console.log('SERVER USER CTRL - post_register ERROR: ', err);
      reply().code(err ? 400 : 200);
    });
  }
};
