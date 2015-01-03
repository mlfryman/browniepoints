'use strict';

var Joi  = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Upload a Photo',
  tags:['prizes'],
  validate: {
    params: {
      prizeId: Joi.number().required()
    }
  },
  payload:{
    maxBytes: 4194304, // 2^22 ; 4MB
    output:'stream',
    parse: true,
    // surgically give this route 60s to timeout
    timeout: 60000
  },
  handler: function(request, reply){
    Prize.upload(request.auth.credentials, request.payload.file, request.payload.file.hapi.filename, request.params.prizeId, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};

