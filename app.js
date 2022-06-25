/////////////////////////////// Globals /// //////////////////////////////////////////////////////////

const gridSpaces = document.querySelectorAll('.grid__space');
const gridSpacesArray = Array.from(gridSpaces);
const [gridSpace0, gridSpace1, gridSpace2,
       gridSpace3, gridSpace4, gridSpace5,
       gridSpace6,gridSpace7,gridSpace8] = gridSpacesArray;

///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// Gameboard Module //////////////////////////////////////////////////////

// Player 1 => 'X', Player 2 => 'O'
const gameBoard = (function(){                          // MODULE
    let marker = '';
    let gameBoard = [null, null, null, null, null, null, null, null, null];

    const createNewGameboard = function() {
        gameBoard = [null, null, null, null, null, null, null, null, null];
        gameController.initTurns(player1, player2);
        marker = gameController.setMarker(player1,player2);
    }

    const showGameboard = function() {

    }

    const updateGameboard = function(space) {            // space is an element with data index value from 0 to 8
        space.innerText = marker;
        gameController.changeTurns(player1,player2);
        marker = gameController.setMarker(player1,player2);
    }

    return{
        createNewGameboard,
        showGameboard,
        updateGameboard
    }
})();


///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// Player Factory //////////////////////////////////////////////////////

const Player = function(name){                      
    const isTurn = false;
    return {name, isTurn};
}

const player1 = Player('player1');      // global
const player2 = Player('player2');      // global

//////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// Game Controller Module ////////////////////////////////////////////////////

const gameController = function(player1, player2){

    const initTurns = (player1,player2) => {
        player1.isTurn = true;
        player2.isTurn = false;
    };

    const setMarker = (player1, player2) => {
        if(player1.isTurn){
            return '◯';
        } else {
            return '✖';
        }
    };

    const changeTurns = (player1, player2) => {
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
    };

    return {initTurns, setMarker, changeTurns};
}();

//////////////////////////////////////////////////////////////////////////////////////////////////////


// Event Handlers //

gridSpaces.forEach(gridSpace => {
    gridSpace.onclick = (e) => {
        const space = e.target;
        gameBoard.updateGameboard(space);
    }
})

gameBoard.createNewGameboard();
