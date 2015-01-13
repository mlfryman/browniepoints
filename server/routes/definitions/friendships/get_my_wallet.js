'use strict';

var Joi        = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get Wallet totals for a Friendship',
  tags:['friendships', 'transactions', 'wallets'],
  validate: {
    params: {
      friendshipId: Joi.number().min(1).required()
    }
  },
  handler: function(request, reply){
    request.payload.myId = request.auth.credentials.id;
    console.log('SERVER FRIENDSHIP CTRL - .myWallet REQUEST.PAYLOAD: ', request.payload);
    Friendship.myWallet(request.params.friendshipId, request.payload, function(err){
      if(err){console.log('SERVER FRIENDSHIP CTRL - .myWallet ERROR: ', err);}
      reply().code(err ? 400 : 200);
    });
  }
};

