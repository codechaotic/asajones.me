require('.');
// Necesary for angular tests on webpack
var module = angular.mock.module;
var inject = angular.mock.inject;

describe('RouteHomeController', function() {

  beforeEach(module('app.route.home'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('title', function() {
    it('equals homepage', function() {
      var ctrl = $controller('RouteHomeController');
      expect(ctrl.title).toEqual('homepage');
    });
  });
});
