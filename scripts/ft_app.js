'use strict';

/* App Module */

var fastTypingApp = angular.module('fastTypingApp', [
  'ngRoute','fastTypingControllers'
  //'fastTypingServices'
]);

fastTypingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/ft_inicio_view.html',
        controller: 'FastTypingInicioController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);