'use strict';

var User = require('../../../models/User');

module.exports = {
  description: 'Get all Users',
  tags:['users','search'],
  handler: function(request, reply){
    User.findAll(request.auth.credentials.id, function(err, users){
      if(err){console.log('SERVER ERROR - USER CTRL User.findAll: ', err);}
      reply({users:users}).code(err ? 400 : 200);
    });
  }
};
