/////////////////////////////// Globals /// //////////////////////////////////////////////////////////
const body = document.querySelector('body');
const resetBtn = document.querySelector('.reset');
const gridSpaces = document.querySelectorAll('.grid__space');
const gridSpacesArray = Array.from(gridSpaces);
const [gridSpace0, gridSpace1, gridSpace2,
       gridSpace3, gridSpace4, gridSpace5,
       gridSpace6,gridSpace7,gridSpace8] = gridSpacesArray;
    
const impossibleModeBtn = document.querySelector('.slider');
const grid = document.querySelector('.grid');
const mainHeader = document.querySelector('.main-header');


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

////////////////////////////////// Computer Player ///////////////////////////////////////////////////

const computer = (function () {
    const rows = [[0,1,2],[3,4,5],[6,7,8]];
    const cols = [[0,3,6],[1,4,7],[2,5,8]];
    const diagonals = [[0,4,8], [2,4,6]];
    let lastPlayedComputerPosition = 0;

    const makeRandMove = function(){
        const currentSpaces = gameBoard.getGameboard();
        const openSpaces = [];
        for (i=0; i<currentSpaces.length; i++) {
            if (currentSpaces[i] === 0) openSpaces.push(i);
        }
        
        const getRandomSpace = () => {
            const randSpaceIndex = Math.floor(Math.random()*openSpaces.length);
            return openSpaces[randSpaceIndex];
        }

        const randSpace = getRandomSpace();
        gameBoard.updateGameboard(randSpace);
        lastPlayedComputerPosition = randSpace;
    }

    const makeMove = function(lastPlayedPosition){
        const checkedPlayerLines = [];
        const checkedComputerLines = [];

        if(rows[0].includes(lastPlayedPosition)) checkedPlayerLines.push(rows[0])
        if(rows[1].includes(lastPlayedPosition)) checkedPlayerLines.push(rows[1])
        if(rows[2].includes(lastPlayedPosition)) checkedPlayerLines.push(rows[2])

        if(cols[0].includes(lastPlayedPosition)) checkedPlayerLines.push(cols[0])
        if(cols[1].includes(lastPlayedPosition)) checkedPlayerLines.push(cols[1])
        if(cols[2].includes(lastPlayedPosition)) checkedPlayerLines.push(cols[2])

        if(diagonals[0].includes(lastPlayedPosition)) checkedPlayerLines.push(diagonals[0])
        if(diagonals[1].includes(lastPlayedPosition)) checkedPlayerLines.push(diagonals[1])



        if(rows[0].includes(lastPlayedComputerPosition)) checkedComputerLines.push(rows[0])
        if(rows[1].includes(lastPlayedComputerPosition)) checkedComputerLines.push(rows[1])
        if(rows[2].includes(lastPlayedComputerPosition)) checkedComputerLines.push(rows[2])

        if(cols[0].includes(lastPlayedComputerPosition)) checkedComputerLines.push(cols[0])
        if(cols[1].includes(lastPlayedComputerPosition)) checkedComputerLines.push(cols[1])
        if(cols[2].includes(lastPlayedComputerPosition)) checkedComputerLines.push(cols[2])

        if(diagonals[0].includes(lastPlayedComputerPosition)) checkedComputerLines.push(diagonals[0])
        if(diagonals[1].includes(lastPlayedComputerPosition)) checkedComputerLines.push(diagonals[1])



        if(gameBoard.getGameboard()[4] === 0){
            gameBoard.getGameboard()[4] = -1;
            gameBoard.updateGameboard();
            lastPlayedComputerPosition = 4;
            return;
        }

        for (const line of checkedComputerLines){
            let total = 0;
            for(const index of line){
                total += gameBoard.getGameboard()[index];
            }
            
            if(total === -2) {
                for(const index of line){
                    if(gameBoard.getGameboard()[index] === 0) {
                        gameBoard.getGameboard()[index] = parseInt(-1);
                        gameBoard.updateGameboard();
                        lastPlayedComputerPosition = index;
                        return;
                    }
                }
            }
        }

        for (const line of checkedPlayerLines){
            let total = 0;
            for(const index of line){
                total += gameBoard.getGameboard()[index];
            }
            
            if(total === 2) {
                for(const index of line){
                    if(gameBoard.getGameboard()[index] === 0) {
                        gameBoard.getGameboard()[index] = parseInt(-1);
                        gameBoard.updateGameboard();
                        lastPlayedComputerPosition = index;
                        return;
                    }
                }
            }
        }

        makeRandMove();
    }

    const getLastPlayedComputerPosition = () => lastPlayedComputerPosition;

    return{
        makeMove,
        getLastPlayedComputerPosition
    }

})()


//////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////// Minimax Computer //////////////////////////////////////////////////////

const superComputer = (function(){
    const checkedLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    const isWinningState = function(gameBoard) {         //determines whether a given board state is a win/loss/tie
        for (const line of checkedLines){
            let total = 0;
            for(const index of line){
                total += gameBoard[index];
                if(total === 3) {
                    return "humanWin";
                }
                if(total === -3) {
                    return "computerWin";
                }
            }
        }
        return false;
    }

    const computeValue = function(gameBoard) {
        const checkedLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (const line of checkedLines){
            let total = 0;
            for(const index of line){
                total += gameBoard[index];
                if(total === 3) {
                    return 100;
                }
                if(total === -3) {
                    return -100;
                }
            }
        }
        if(!gameBoard.includes(0)) return 0;
    }


    const minimax = function(newBoard, maximizingPlayer){
        const availableSpots = [];
        for (let i=0; i<newBoard.length; i++){
            if(newBoard[i] === 0) availableSpots.push(i);
        }

        if(isWinningState(newBoard) === "humanWin"){
            return {score:10};
        } else if(isWinningState(newBoard) === "computerWin"){
            return {score:-10};
        } else if (!newBoard.includes(0)){
            return {score: 0};
        }

        let moves = [];

         // loop through available spots
        for (let i = 0; i < availableSpots.length; i++){
        //create an object for each and store the index of that spot 
            let move = {};
            move.index = availableSpots[i];
        
            if(maximizingPlayer){
                newBoard[availableSpots[i]] = 1;
                let result = minimax(newBoard, !maximizingPlayer);
                move.score = result.score;
            } else {
                newBoard[availableSpots[i]] = -1;
                let result = minimax(newBoard, !maximizingPlayer);
                move.score = result.score;
            }

            newBoard[availableSpots[i]] = 0;
            moves.push(move);
        }

        let bestMove;
        if(maximizingPlayer){
            let bestScore = -10000;
            for(let i=0; i<moves.length;i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i=0; i<moves.length;i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    const makeMove = function() {
        const index = minimax(gameBoard.getGameboard(), false).index;
        gameBoard.updateGameboard(index);
    }
        

    return{
        minimax,
        makeMove
    }
})()





//////////////////////////////////////////////////////////////////////////////////////////////////////




// Event Handlers //

gridSpaces.forEach(gridSpace => {
    gridSpace.onclick = (e) => {
        while(!isGameOver){
            if(e.target.innerText != '') return
            const gridSpaceIndexNumber = e.target.dataset.index;            // This is a string
            gameBoard.updateGameboard(gridSpaceIndexNumber);
            let winner = gameController.checkWinner(parseInt(gridSpaceIndexNumber));     // parseInt the string into an integer
            if (winner) {
                const div = document.createElement('div');
                div.classList.add('msg-win')
                div.classList.add('delete-me')
                div.append(`${winner} Wins!`);
                mainHeader.append(div);
                return;
            } else if (isGameOver === true) {
                const div = document.createElement('div');
                div.classList.add('msg-tie')
                div.classList.add('delete-me')
                div.append('It\'s a tie!');
                mainHeader.append(div);
            }


            if(!impossibleMode){
                if(!isGameOver){
                    computer.makeMove(parseInt(gridSpaceIndexNumber));              // computer makes move
                    
                    winner = gameController.checkWinner(computer.getLastPlayedComputerPosition());
                    if (winner) {
                        const div = document.createElement('div');
                        div.classList.add('msg-win');
                        div.classList.add('delete-me');
                        div.append(`${winner} Wins!`);
                        mainHeader.append(div);
                    } else if (isGameOver === true) {
                        const div = document.createElement('div');
                        div.classList.add('msg-win');
                        div.classList.add('delete-me');
                        div.append('It\'s a tie!');
                        mainHeader.append(div);
                    }
                }
            } else {
                if(!isGameOver){
                    superComputer.makeMove();              // superComputer makes move
                    
                    winner = gameController.checkWinner(computer.getLastPlayedComputerPosition());
                    if (winner) {
                        const div = document.createElement('div');
                        div.classList.add('msg-win');
                        div.classList.add('delete-me');
                        div.append(`${winner} Wins!`);
                        mainHeader.append(div);
                    } else if (isGameOver === true) {
                        const div = document.createElement('div');
                        div.classList.add('msg-tie');
                        div.classList.add('delete-me');
                        div.append('It\'s a tie!');
                        mainHeader.append(div);
                    }
                }
            }
        }
    }
})

resetBtn.onclick = (e) => {
    gameBoard.createNewGameboard();
    if(document.contains(document.querySelector('.delete-me'))){
        document.querySelector('.delete-me').remove();
    }  
}

let impossibleMode = false;

impossibleModeBtn.onclick = () => {
    impossibleMode = !impossibleMode;
}






//// Init first gameboard ////

gameBoard.createNewGameboard();
