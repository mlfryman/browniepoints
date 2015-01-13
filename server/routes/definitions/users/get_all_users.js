'use strict';

var User = require('../../../models/user');

module.exports = {
  description: 'Get all Users',
  tags:['users','search'],
  handler: function(request, reply){
    User.findAll(request.auth.credentials.id, function(err, users){
      if(err){console.log('SERVER USER CTRL - .findAll ERROR: ', err);}
      reply({users:users}).code(err ? 400 : 200);
    });
  }
};
