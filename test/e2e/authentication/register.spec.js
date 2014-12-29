'use strict';

var h = require('../../helpers/helpers');

describe('register', function(){
  beforeEach(function(){
    browser.get('/#/register');
  });

  it('should get register page', function(){
    expect(element(by.css('.section-header > h1')).getText()).toEqual('REGISTER');
  });

  it('should register a new user', function(){
    element(by.model('user.username')).sendKeys('sam' + h.random(50000));
    element(by.model('user.email')).sendKeys('sam@sam.com');
    element(by.model('user.password')).sendKeys('456789');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('.section-header > h1')).getText()).toEqual('LOGIN');
  });
});
