'use strict';

var Prize = require('../../../models/prize');

module.exports = {
  description: 'Count all Prizes by User',
  tags:['prizes'],
  handler: function(request, reply){
    Prize.count(request.auth.credentials, function(err, count){
      reply({count:count}).code(err ? 400 : 200);
    });
  }
};
