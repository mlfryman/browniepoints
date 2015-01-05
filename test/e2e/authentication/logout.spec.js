'use strict';

describe('logout', function(){
  it('should logout a User', function(){
    browser.get('/#/login');
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('123456');
    element(by.css('a.btn.btn-primary.btn-small.btn-raised.center[ng-click]')).click();
    expect(element(by.css('a[ui-sref="prizes.list"]')).isDisplayed()).toBeTruthy();
    element(by.id('avatarlink')).click();
    expect(element(by.css('a[ui-sref="prizes.list"]')).isDisplayed()).toBeFalsy();
    expect(element(by.css('.header-content > h1')).getText()).toEqual('BrowniePoints');
  });
});

