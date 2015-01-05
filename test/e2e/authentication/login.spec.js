'use strict';

describe('login', function(){
  beforeEach(function(){
    browser.get('/#/login');
  });

  it('should get login page', function(){
    expect(element(by.css('.signup-panel > p')).getText()).toEqual('LOGIN');
  });

  it('should login a User', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('123456');
    element(by.css('a.btn.btn-primary.btn-small.btn-raised.center[ng-click]')).click();
    expect(element(by.css('.header-content > h1')).getText()).toEqual('BrowniePoints');
  });

  it('should NOT login a User - bad credentials', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('wrong');
    element(by.css('a.btn.btn-primary.btn-small.btn-raised.center[ng-click]')).click();
    expect(element(by.css('.signup-panel > p')).getText()).toEqual('LOGIN');
  });
});

