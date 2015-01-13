/* jshint camelcase:false */

'use strict';

var Joi   = require('joi'),
    Prize = require('../../../models/prize');

module.exports = {
  description: 'Buy a Prize',
  tags:['friendships', 'transactions', 'prizes'],
  validate: {
    params: {
      friendshipId: Joi.number().min(1).required(),
      prizeId: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    Prize.buy(request.params.friendshipId, request.payload, function(err){
      if(err){console.log('SERVER PRIZE CTRL - Prize.buy ERROR: ', err);}
      reply().code(err ? 400 : 200);
    });
  }
};

