'use strict';

var Prize = require('../../../models/prize');

module.exports = {
  description: 'Count all Prizes by User',
  tags:['prizes'],
  // allows us to test mobile app
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Prize.count(request.auth.credentials, function(err, prize){
      reply({prize:prize}).code(err ? 400 : 200);
    });
  }
};
