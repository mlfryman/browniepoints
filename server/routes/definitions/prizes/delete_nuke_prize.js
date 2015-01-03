'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Delete a Prize',
  tags:['prizes'],
  validate: {
    params: {
      prizeId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Prize.nuke(request.auth.credentials, request.params.prizeId, function(err, prizeId){
      reply({prizeId:prizeId}).code(err ? 400 : 200);
    });
  }
};

