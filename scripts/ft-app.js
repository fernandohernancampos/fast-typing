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
                      passAvailable: 2,
                      passUsed:2,
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