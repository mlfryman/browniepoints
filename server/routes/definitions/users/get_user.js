'use strict';

var User = require('../../../models/user'),
    Joi  = require('joi');

module.exports = {
  description: 'Get a user by email address',
  tags:['users', 'search'],
  validate: {
    params: {
      searchEmail: Joi.string().min(1).required()
    }
  },
  handler: function(request, reply){
    var params = {userId:request.auth.credentials.id, searchEmail: request.params.searchEmail};
    User.findByEmail(params, function(err, user){
      if(err){console.log('SERVER ERROR - USER CTRL User.findByEmail: ', err);}
      reply({user:user}).code(err ? 400 : 200);
    });
  }
};
