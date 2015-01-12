'use strict';

var Prize = require('../../../models/prize');

module.exports = {
  description: 'Get all Prize Categories',
  tags:['prizes', 'categories'],
  handler: function(request, reply){
    Prize.categories(function(err, categories){
      if(err){console.log('SERVER PRIZE CTRL - Prize.categories ERROR: ', err);}
      reply({categories:categories}).code(err ? 400 : 200);
    });
  }
};
