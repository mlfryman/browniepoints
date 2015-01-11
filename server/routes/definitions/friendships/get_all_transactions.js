
'use strict';

var Joi        = require('joi'),
    Friendship = require('../../../models/friendship');

module.exports = {
  description: 'Get all Transactions for a Friendship',
  tags:['friendships', 'transactions'],
  validate: {
    params: {
      friendshipId: Joi.number().required()
    }
  },
  handler: function(request, reply){
    Friendship.findAllTransactions(request.params.friendshipId, function(err, results){
      if(err){console.log('SERVER FRIENDSHIP CTRL - .findAllTransactions ERROR: ', err);}
      reply(results).code(err ? 400 : 200);
    });
  }
};
