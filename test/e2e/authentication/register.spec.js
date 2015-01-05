'use strict';

var h = require('../../helpers/helpers');

describe('register', function(){
  beforeEach(function(){
    browser.get('/#/register');
  });

  it('should get register page', function(){
    expect(element(by.css('.signup-panel > p')).getText()).toEqual('REGISTER');
  });

  it('should register a new user', function(){
    element(by.model('user.first_name')).sendKeys('Sam');
    element(by.model('user.last_name')).sendKeys('Samerson');
    element(by.model('user.username')).sendKeys('sam' + h.random(50000));
    element(by.model('user.email')).sendKeys('sam@sam'+ h.random(50000) + '.com');
    element(by.model('user.password')).sendKeys('456789');
    element(by.css('a.btn.btn-primary.btn-small.btn-raised.center[ng-click]')).click();
    expect(element(by.css('.signup-panel > p')).getText()).toEqual('LOGIN');
  });
});

