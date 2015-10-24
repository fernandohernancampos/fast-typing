'use strict';

/* Controllers */

var fastTypingControllers = angular.module('fastTypingControllers', []);

fastTypingControllers.controller('FastTypingHomeController', [
	'$scope', 
	'$location',
	'userData',
  function($scope, $location, userData) {
    $scope.user = userData;

    $scope.goToTimeTrialGame = function(){
    	$location.path("/game-time-trial");
    };

    $scope.goToLeaderboardPage = function() {
    	$location.path("/leaderboard");
    }
  }]);

fastTypingControllers.controller('FastTypingLeaderboardController', [
	'$scope',
	'leaders',
	function($scope, leaders){
		$scope.leaders = leaders;
	}]);

fastTypingControllers.controller('FastTypingGameTimeTrialController', [
	'$scope',
	'gameModel',
  function($scope,gameModel) {
    $scope.username = "Fernando Campos";

    function init (){
    	$scope.model = {};
	    $scope.model = gameModel;

	    //palabra inicial
	    $scope.getWord();

	    //seteo estado inicial
	    $scope.model.gameStats.status = "PLAYING";

	    //Encontrar la forma de poner un contador inicial para poner atento al usuario (3..2..1)
    	//temporizador
		$('div#clock').countdown(new Date().getTime() + $scope.model.time)
		    .on('update.countdown', function(event){
		    	var timeInSec = ($scope.model.time / 1000),
		    		timeLapse = (timeInSec - event.offset.seconds) / timeInSec;
		    	$('div#timeLapse').css("width", (timeLapse * 100) + "%");
		    })
		    .on('finish.countdown', function(){
		    	$scope.endGame("TIMEOUT");	
		    });
	
    };

    $scope.getNumber = function(num) {
	    return new Array(num);
	}    

    //** Actions **//
    $scope.getWord = function getWord() {
    	var index,
    		words = $scope.model.words;
		while (!words[index]){
			index = Math.floor(Math.random() * 5);
		}
		$scope.model.currentWord = words[index];
    };

    $scope.checkWord = function checkWord(){
    	if($scope.model.insertedWord != $scope.model.currentWord){
			//pierde una vida
			$scope.model.gameStats.lives -= 1;

			if(!$scope.isAlive()){
				//pierde el juego
				$scope.endGame("DEAD");
			}
		} else {
			//TODO: diseñar sistema de premios. Por ejemplo: X2 si hizo correcta 3 veces seguidas
			$scope.model.gameStats.score += 1;
		}

		$scope.model.insertedWord = null;
		$scope.getWord();
    };

    $scope.endGame = function endGame(finalStatus){
    	//finaliza el juego por timeout
		$scope.model.gameStats.status = "GAMEOVER";
		$scope.model.gameStats.endStatus = finalStatus;

		//Guardar puntaje
		$scope.saveScore();

		//redirect to end game page
    };

    $scope.saveScore = function saveScore(){
    	//llamar al servicio de parse
    };

    $scope.jumpWord = function jumpWord(){
		$scope.model.gameStats.escapes -= 1;
		if($scope.model.gameStats.escapes > 0){
			//limipiar input
			$scope.getWord();
		}else{
			console.log("No podes pasar la palabra");
		}
    };

    $scope.isAlive = function isAlive(){
    	return ($scope.model.gameStats.status == "PLAYING" && $scope.model.gameStats.lives != 0);
    };

    //** initializacion **//
    init();

  }]);
