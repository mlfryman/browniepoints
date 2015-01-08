'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Show a Prize',
  tags:['prizes'],
  validate: {
    params: {
      prizeId: Joi.number().required()
    }
  },
  // allows us to test mobile app
  cors:{origin: ['http://localhost:8100'], credentials: true},
  handler: function(request, reply){
    Prize.show(request.auth.credentials, request.params.prizeId, function(err, prize){
      reply(prize).code(err ? 404 : 200);
    });
  }
};
