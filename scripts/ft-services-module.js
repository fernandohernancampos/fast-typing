'use strict';

/* Controllers */

var fastTypingServices = angular.module('fastTypingServices', []);

fastTypingServices.service('FacebookService', 
	function facebookService(){
		//TODO: Implementar todos los servicios necesarios
		var userData = {
			name: "Fernando Campos",
			bestScore: 9
		};

		this.getUserData = function getUserData(){
			return userData;
		};
	});



fastTypingServices.service('ParseService',
	//TODO: Implementar todos los servicios necesarios
	function parseService(){
		var leaders = [{
			  name: 'Einstein',
			  picture: 'media/images/celebs/einstein.png',
			  bestScore: 9
			},{
			  name: 'Xzibit',
			  picture: 'media/images/celebs/xzibit.png',
			  bestScore: 8
			},{
			  name: 'Goldsmith',
			  picture: 'media/images/celebs/goldsmith.png',
			  bestScore: 3
			},{
			  name: 'Sinatra',
			  picture: 'media/images/celebs/sinatra.png',
			  bestScore: 6
			},{
			  name: 'George',
			  picture: 'media/images/celebs/george.png',
			  bestScore: 5
			},{
			  name: 'Jacko',
			  picture: 'media/images/celebs/jacko.png',
			  bestScore: 3
			},{
			  name: 'Rick',
			  picture: 'media/images/celebs/rick.png',
			  bestScore: 3
			},{
			  name: 'Keanu',
			  picture: 'media/images/celebs/keanu.png',
			  bestScore: 6
			},{
			  name: 'Arnie',
			  picture: 'media/images/celebs/arnie.png',
			  bestScore: 5
			},{
			  name: 'Jean-Luc',
			  picture: 'media/images/celebs/jeanluc.png',
			  bestScore: 6
			}];

		this.getLeaders = function getleaders(){
			return leaders;
		};
	});

