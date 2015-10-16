//** Definicion de variables **//
var gameState = {
	status: 0 // 0: no iniciado, 1: jugando, 2: terminado 
	},
	gameType = "TIMEOUT",
	words = ["Prueba", "Maraca", "Arbol", "Nispero", "Agujero"],
	currentWord,
	insertedWord,
	languaje = "es",
	gameTime = 20000;

//** Funcionalidad **//

//Inicializa el juego
function initGame(gameType, gameTime, languaje){

	gameState= {
		lives: 3,
		score: 0,
		passAvailable: 2,
		passUsed:2,
		status: 1,
		endStatus: null
	};

	//cargar las palabras que se van a usar para jugar por el lenguaje seleccionado
	loadWords(languaje);

	//Cargar primer palabra
	getWord();

	//carga de eventos TODO: Mover a otro lugar
	$( "#insertedWord" ).on( "keypress", function(event) {
      if(event.which == 13) {
      	insertedWord = $("#insertedWord").val();
      	console.log("La palabra ingresada es: " + insertedWord);
      	checkWord();
      }
         
    });

	//temporizador
	$('div#clock').countdown(new Date().getTime() + gameTime)
    .on('update.countdown', function(event){
    	timeLapse = (event.offset.seconds - (gameTime / 1000)) / (gameTime / 1000);
    	$('div#timeLapse').css("width", (timeLapse / (gameTime / 1000)) + 100);
    })
    .on('finish.countdown', endGame("TIMEOUT"));


};

function loadWords(languaje){
	return false;
	var filePath = "../media/words/words_" + languaje + ".txt";

    $.ajax(filePath,
        {
            success: function(file){
                words = file.split('\n');
            }
        }
    );

};

function endGame(finalStatus){
	if(gameState.status == 1){
		//finaliza el juego por timeout
		gameState.status = 2;
		gameState.endStatus = finalStatus;

		//ocultarJuego
		$("#game").hide();
		$("#endGame").show();

		//SUMAR PUNTOS

		//COMPARAR CON LOS ANTERIORES

		//ENVIAR PUNTAJE
		$("#score").html(gameState.score);

		//RECALCULAR PUNTAJE CON LOS AMIGOS
	}
}

function getWord(){
	var index;
	while (!words[index]){
		index = Math.floor(Math.random() * 5);
	}
	currentWord = words[index];
	//Cargar elemento html con la palabra
	$("#currentWord").html(currentWord);
	return currentWord;
};

function checkWord(){
	if(insertedWord != currentWord){
		console.log("lost a life");
		//pierde una vida
		gameState.lives -= 1;

		if(gameState.lives == 0){
			//pierde el juego
			endGame("DEAD");
		}
	} else {
		//TODO: diseñar sistema de premios. Por ejemplo: X2 si hizo correcta 3 veces seguidas
		gameState.score += 1;
	}

	$("#insertedWord").val("");
	getWord();
};

function jumpWord(){
	gameState.passUsed += 1;
	if(gameState.passAvailable >= gameState.passUsed){
		//limipiar input
		getWord();
	}else{
		console.log("No podes pasar la palabra");
	}
}

