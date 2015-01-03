'use strict';

var Message = require('../../../models/message');

module.exports = {
  description: 'Count all Messages by User',
  tags:['messages'],
  // allows us to test mobile app
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Message.count(request.auth.credentials, function(err, message){
      reply({message:message}).code(err ? 400 : 200);
    });
  }
};

