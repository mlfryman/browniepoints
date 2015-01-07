'use strict';

var User = require('../../../models/user');
    // Joi  = require('joi');

module.exports = {
  description: 'Upload an Avatar',
  tags:['users', 'images'],
  payload:{
    maxBytes: 4194304,
    output:'stream',
    parse: true,
    timeout: 60000
  },
  handler: function(request, reply){
    request.payload.userId = request.auth.credentials.id;
    User.upload(request.auth.credentials, request.payload.file, request.payload.file.hapi.filename, request.params.userId, function(err){
      reply().code(err ? 400 : 200);
    });
  }
};

