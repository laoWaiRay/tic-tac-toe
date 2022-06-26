/////////////////////////////// Globals /// //////////////////////////////////////////////////////////
const body = document.querySelector('body');
const resetBtn = document.querySelector('.reset');
const gridSpaces = document.querySelectorAll('.grid__space');
const gridSpacesArray = Array.from(gridSpaces);
const [gridSpace0, gridSpace1, gridSpace2,
       gridSpace3, gridSpace4, gridSpace5,
       gridSpace6,gridSpace7,gridSpace8] = gridSpacesArray;

let isGameOver = false;

///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// Gameboard Module //////////////////////////////////////////////////////

// Player 1 => 'X', Player 2 => 'O'

const gameBoard = (function(){                          // MODULE
    let marker = 0;
    let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const createNewGameboard = function() {
        isGameOver = false;
        gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(let i=0; i<gameBoard.length; i++){
            gridSpacesArray[i].innerText = "";
        }
        gameController.initTurns(player1, player2);
        marker = gameController.setMarker(player1,player2);
    }

    const getGameboard = function() {
        return gameBoard;
    }

    const updateGameboard = function(gridSpaceIndexNumber) {            // space is an element with data index value from 0 to 8
        gameBoard[gridSpaceIndexNumber] = marker;

        for(let i=0; i<gameBoard.length; i++){
            if(gameBoard[i] === 1) gridSpacesArray[i].innerText = 'X';
            if(gameBoard[i] === -1) gridSpacesArray[i].innerText = 'O';
        }

        gameController.changeTurns(player1,player2);
        marker = gameController.setMarker(player1,player2);
    }

    return{
        createNewGameboard,
        getGameboard,
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
            return 1;
        } else {
            return -1;
        }
    };

    const changeTurns = (player1, player2) => {
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
    };


    const checkWinner = function(lastPlayedPosition){
        const rows = [[0,1,2],[3,4,5],[6,7,8]];
        const cols = [[0,3,6],[1,4,7],[2,5,8]];
        const diagonals = [[0,4,8], [2,4,6]];
        let winner = "";

        const checkedLines = [];

        if(rows[0].includes(lastPlayedPosition)) checkedLines.push(rows[0])
        if(rows[1].includes(lastPlayedPosition)) checkedLines.push(rows[1])
        if(rows[2].includes(lastPlayedPosition)) checkedLines.push(rows[2])

        if(cols[0].includes(lastPlayedPosition)) checkedLines.push(cols[0])
        if(cols[1].includes(lastPlayedPosition)) checkedLines.push(cols[1])
        if(cols[2].includes(lastPlayedPosition)) checkedLines.push(cols[2])

        if(diagonals[0].includes(lastPlayedPosition)) checkedLines.push(diagonals[0])
        if(diagonals[1].includes(lastPlayedPosition)) checkedLines.push(diagonals[1])

        for (const line of checkedLines){
            let total = 0;
            for(const index of line){
                total += gameBoard.getGameboard()[index];
                if(total === 3) {
                    winner = "Player 1";
                    isGameOver = true;
                }
                if(total === -3) {
                    winner = "Player 2";
                    isGameOver = true;
                }
            }
        }

        if(isGameOver === false && !gameBoard.getGameboard().includes(0)){
            isGameOver = true;
        }

        if(isGameOver === true && winner != "") return winner;
    }

    return {initTurns, setMarker, changeTurns, checkWinner};
}();

//////////////////////////////////////////////////////////////////////////////////////////////////////


// Event Handlers //

gridSpaces.forEach(gridSpace => {
    gridSpace.onclick = (e) => {
        while(!isGameOver){
            if(e.target.innerText != '') return
            const gridSpaceIndexNumber = e.target.dataset.index;            // This is a string
            gameBoard.updateGameboard(gridSpaceIndexNumber);
            const winner = gameController.checkWinner(parseInt(gridSpaceIndexNumber));     // parseInt the string into an integer
            if (winner) {
                const div = document.createElement('div');
                div.classList.add('msg-win')
                div.classList.add('delete-me')
                div.append(`${winner} Wins!`);
                body.append(div);
                return;
            } else if (isGameOver === true) {
                const div = document.createElement('div');
                div.classList.add('msg-tie')
                div.classList.add('delete-me')
                div.append('It\'s a tie!');
                body.append(div);
            }
        }
    }
})

resetBtn.onclick = (e) => {
    gameBoard.createNewGameboard();
    document.querySelector('.delete-me').remove();
}






//// Init first gameboard ////

gameBoard.createNewGameboard();
