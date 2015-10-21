'use strict';

/* App Module */

var fastTypingApp = angular.module('fastTypingApp', [
  'ngRoute','fastTypingControllers'
  //'fastTypingServices'
]);


//inicializar todo lo que tenga que ver con facebook y parse..




fastTypingApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/ft-home-view.html',
        controller: 'FastTypingHomeController'
      }).
      when('/game-time-trial', {
        templateUrl: 'views/ft-game-time-trial-view.html',
        controller: 'FastTypingGameTimeTrialController',
        resolve: {
            gameModel: function(){
                return {
                  gameStats:{
                      gameTime: 2000,
                      lives: 3,
                      score: 0,
                      escapes:2,
                      status: "WAITING",
                      endStatus: null
                  },
                  words: ["cacatua","elefante","prueba","banana", "billetera", "lapicera", "televisor"],
                  time: 20000,
                }
            }
          }
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


//** Directives **//
fastTypingApp.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

fastTypingApp.directive('ngEscape', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 27) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEscape, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });