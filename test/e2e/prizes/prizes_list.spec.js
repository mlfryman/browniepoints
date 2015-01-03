'use strict';

var path = require('path');

describe('prizes list', function(){
  beforeEach(function(done){
    login();
    done();
  });

  it('should get the prizes page', function(){
    expect(element(by.css('.section-header > h1')).getText()).toEqual('PRIZES');
  });

  it('should create a new Prize', function(){
    createPrize('a', 'b', 1, 'c,d,e');
    expect(element(by.model('prize.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('prize.description')).getAttribute('value')).toEqual('');
    expect(element(by.model('prize.cost')).getAttribute('value')).toEqual('');
    expect(element(by.model('prize.tags')).getAttribute('value')).toEqual('');
    expect(element.all(by.repeater('prize in prizes')).count()).toBeGreaterThan(0);
  });

  it('should go to the prize detail page', function(){
    createPrize('a', 'b', 1, 'c,d,e');
    element(by.repeater('prize in prizes').row(0)).element(by.css('td:nth-child(1) > a')).click();
    expect(element(by.css('.section-header > h1')).getText()).toEqual('a');
  });
});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('bob');
  element(by.model('user.password')).sendKeys('123456');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/prizes');
}

function createPrize(title, description, cost, tags){
  var image = path.resolve(__dirname, '../../fixtures/flag.png');
  element(by.model('prize.title')).sendKeys(title);
    // h.debug('red');
  element(by.model('prize.description')).sendKeys(description);
  element(by.model('prize.cost')).sendKeys(cost);
  element(by.model('prize.tags')).sendKeys(tags);
  element(by.css('input[type="file"]')).sendKeys(image);
    // h.debug('blue');
  element(by.css('a.button.expand.success.radius[ng-click]')).click();
}
