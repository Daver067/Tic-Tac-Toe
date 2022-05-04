    /*************************************************************************************
     * *****module for anything to do with the DOM manipulation (this didnt really work as planned...)
    ************************************************************************************ */
const dom = (() => {
    let inputs = {
    container: document.querySelector('.container'),
    playerSelection: document.querySelector('.playerSelection'),
    popUp: document.querySelector('.popUp'),
    popUp2: document.querySelector('.popUp2'),
    topH2: document.querySelector('#topH2'),
    bottomH2: document.querySelector('#bottomH2')


    } 
    return {inputs};
})();


/***************************************************************************************
 This is the module where the game is played
 **************************************************************************************/
let game = (()=>{
    let turnCounter = 0;

    // player clicking on a square
    function selectSquare(squareSelected){
        if (win.winner == true){
            return;
        }
        //already played in square
        if (squareSelected.value != 0) {
            dom.inputs.topH2.innerHTML = "You must play in an un-occupied square";
            return;
        }
        //player 1's turn
        if ((game.turnCounter == 0) || (game.turnCounter % 2 == 0)){
        squareSelected.InnerContent(`${player.player1.marker}`);
        dom.inputs.topH2.innerHTML = `It is ${player.player2.name}'s turn now.`
        squareSelected.value = 1;
        }
        //player 2's turn
        else {
            squareSelected.InnerContent(`${player.player2.marker}`)
            dom.inputs.topH2.innerHTML = `It is ${player.player1.name}'s turn now.`
            squareSelected.value = 10;
        }
        win.updateWins(squareSelected);
        game.turnCounter++;
        win.checkForWin();
        PlayAgain();
        if ((player.player2.HumanComp == "comp2") && (win.winner == false)){
            //computer.randomPlay(); super easy mode
            computer.findBestMove();
        }

    }


    //building game board function
    function makeSection(section,r1,r2,r3,c1,c2,c3,d1,d2){
        let createNewSquare = document.createElement('div');
        createNewSquare.classList.add("board", section);
        dom.inputs.container.appendChild(createNewSquare);
        createNewSquare = document.querySelector(`.${section}`)
    // The return object
        let tic_tac_toe_square = {
        placement: section,
        value: 0,
        currentInnerContent: "",
        InnerContent: function(newInnerHTML){
            let innerContent2 = document.querySelector(`.${this.placement}`);
            innerContent2.innerHTML = newInnerHTML;
            this.currentInnerContent = innerContent2.innerHTML;
        },
        row1: r1,
        row2: r2,
        row3: r3,
        column1: c1,
        column2: c2,
        column3: c3,
        diag1: d1,
        diag2: d2, 
        }
        //adding event listener to the newly created div
        createNewSquare.addEventListener('click', function(){selectSquare(tic_tac_toe_square)})

        return tic_tac_toe_square;
    }

    
   // the game board setup
    let gameBoard = [
        new makeSection("topLeft",1,0,0,1,0,0,1,0),
        new makeSection("topMid",1,0,0,0,1,0,0,0),
        new makeSection("topRight",1,0,0,0,0,1,0,1),
        new makeSection("midLeft",0,1,0,1,0,0,0,0),
        new makeSection("midMid",0,1,0,0,1,0,1,1),
        new makeSection("midRight",0,1,0,0,0,1,0,0),
        new makeSection("bottomLeft",0,0,1,1,0,0,0,1),
        new makeSection("bottomMid",0,0,1,0,1,0,0,0),
        new makeSection("bottomRight",0,0,1,0,0,1,1,0),
    ]

//function to reset the gameBoard
    function resetGameBoard(){
        game.gameBoard = [];
        game.gameBoard = [
            new makeSection("topLeft",1,0,0,1,0,0,1,0),
            new makeSection("topMid",1,0,0,0,1,0,0,0),
            new makeSection("topRight",1,0,0,0,0,1,0,1),
            new makeSection("midLeft",0,1,0,1,0,0,0,0),
            new makeSection("midMid",0,1,0,0,1,0,1,1),
            new makeSection("midRight",0,1,0,0,0,1,0,0),
            new makeSection("bottomLeft",0,0,1,1,0,0,0,1),
            new makeSection("bottomMid",0,0,1,0,1,0,0,0),
            new makeSection("bottomRight",0,0,1,0,0,1,1,0),
        ]
    }
//function to reset win condition object turn counter and winner boolean
function resetWinConditions(){
    win.winConditions = {
        row1: 0,
        row2: 0,
        row3: 0,
        column1: 0,
        column2: 0,
        column3: 0,
        diag1: 0,
        diag2: 0,
    }
    game.turnCounter = 0;
    win.winner = false;
    dom.inputs.bottomH2.removeChild(dom.inputs.bottomH2.firstElementChild);
    dom.inputs.topH2.innerHTML = `${player.player1.name} goes first.`

}

    // reset game
    function resetGame(){
        while (dom.inputs.container.firstChild){
            dom.inputs.container.removeChild(dom.inputs.container.firstChild)
        }
        resetGameBoard();
        resetWinConditions();
        
        return;
    }
    // function to play again
    function PlayAgain(){
        if (win.winner == true){
        btn = document.createElement('button');
        btn.classList.add("rematch");
        btn.innerHTML = "Click for a rematch";
        btn.addEventListener('click', () => {game.resetGame()})
        dom.inputs.bottomH2.appendChild(btn);
        }
    }

    return {gameBoard, turnCounter, resetGame, PlayAgain};
    })();


/*********************************************************************************************
 *****module for end game conditions
 ****************************************************************************************** */
const win = (()=>{

//Boolean to check if a winner has been declared
let winner = false;
//the rows and columns to check for winning
let winConditions = {
    row1: 0,
    row2: 0,
    row3: 0,
    column1: 0,
    column2: 0,
    column3: 0,
    diag1: 0,
    diag2: 0,
}
//adding values to update win conditions
function updateWins(squareSelected) {
    if (squareSelected.placement.includes("top")){ win.winConditions.row1 += squareSelected.value}
    if (squareSelected.placement.includes("mid")){ win.winConditions.row2 += squareSelected.value};
    if (squareSelected.placement.includes("bottom")){ win.winConditions.row3 += squareSelected.value};
    if (squareSelected.placement.includes("Left")){ win.winConditions.column1 += squareSelected.value};
    if (squareSelected.placement.includes("Mid")){ win.winConditions.column2 += squareSelected.value};
    if (squareSelected.placement.includes("Right")){ win.winConditions.column3 += squareSelected.value};
    if (squareSelected.placement.includes("topLeft")){ win.winConditions.diag1 += squareSelected.value};
    if (squareSelected.placement.includes("midMid")){ win.winConditions.diag1 += squareSelected.value};
    if (squareSelected.placement.includes("bottomRight")){ win.winConditions.diag1 += squareSelected.value};
    if (squareSelected.placement.includes("topRight")){ win.winConditions.diag2 += squareSelected.value};
    if (squareSelected.placement.includes("bottomLeft")){ win.winConditions.diag2 += squareSelected.value};
    if (squareSelected.placement.includes("midMid")){ win.winConditions.diag2 += squareSelected.value};
    }



  //checking for a win condition
  function checkForWin(){
    let winKeys = Object.keys(win.winConditions)
        winKeys.forEach((key) => {
            if (win.winConditions[key] === 3){
                dom.inputs.topH2.innerHTML = `${player.player1.name} wins the game and says ${player.player1.catchPhrase}`
                win.winner = true;
                return;
            }
            else if (win.winConditions[key] === 30){
                dom.inputs.topH2.innerHTML = `${player.player2.name} wins the game and says ${player.player2.catchPhrase}`
                win.winner = true;
                return;
            }
        });
        if (game.turnCounter === 9 && win.winner != true){
            dom.inputs.topH2.innerHTML = `It was a draw.`
            win.winner = true;
            game.turnCounter = 0;
            return;
        }
    };

    return {checkForWin, winConditions, updateWins, winner, }
    })();


/*******************************************************************************************************
 * ***** module Everything to do with the players
 *****************************************************************************************************/
    const player = (() => {
        let player1 = {};
        let player2 = {};
    
        let player1LockButton = document.getElementById("submit1");
        let player2LockButton = document.getElementById("submit2");
        let player1Marker = document.getElementById("marker1");
        let player2Marker = document.getElementById("marker2");
        let player1Name = document.getElementById("name1");
        let player2Name = document.getElementById("name2");
        let player1CatchPhrase = document.getElementById("phrase1");
        let player2CatchPhrase = document.getElementById("phrase2");
        let player1HumanComp = document.getElementById("humanComp1");
        let player2HumanComp = document.getElementById("humanComp2");
        
        function sameMarkers(){
            if (player1.marker == player2.marker){
                dom.inputs.topH2.innerHTML = `Please choose different markers.`
                player1.chose = false;
                player2.chose = false;
                player1.marker = "a";
                player2.marker = "b";
                player1LockButton.addEventListener('click', lockPlayer1Handler)
                player2LockButton.addEventListener('click', lockPlayer2Handler)
            }
        }

        function bothPlayersLocked(){
            sameMarkers();
            if ((player1.chose == true) && (player2.chose == true)){
                dom.inputs.playerSelection.classList.toggle('hidden');
                dom.inputs.container.classList.toggle('hidden');
                dom.inputs.topH2.innerHTML = `${player.player1.name} goes first.`
            }
            else return;
        }

        let lockPlayer1Handler = function(){
            player1.HumanComp = player1HumanComp.value
            player1.name = player1Name.value;
            player1.marker = player1Marker.value;
            player1.catchPhrase = player1CatchPhrase.value;
            player1.chose = true;
            player1LockButton.removeEventListener('click', lockPlayer1Handler);
            bothPlayersLocked()

        }
        let lockPlayer2Handler = function(){
            player2.HumanComp = player2HumanComp.value
            player2.name = player2Name.value;
            player2.marker = player2Marker.value;
            player2.catchPhrase = player2CatchPhrase.value;
            player2.chose = true;
            player2LockButton.removeEventListener('click', lockPlayer2Handler);
            bothPlayersLocked()
        }

        player1LockButton.addEventListener('click', lockPlayer1Handler)
        player2LockButton.addEventListener('click', lockPlayer2Handler)
        
        
        return {player1, player2}

    })();

/******************************************************************************
 * ******* Module for the computer player*************************************
 *****************************************************************************/
const computer = (() => {
    let computerPlayer1Chosen = document.getElementById("humanComp1");
    let computerPlayer2Chosen = document.getElementById("humanComp2");
    
    function compsTurn(){
        checkEmptySquare();
        findBestMove();
    }
    //Find available moves
    function checkEmptySquare(){
        let allSquares = Array.from(game.gameBoard);
        let availableMoves = allSquares.filter(square => square.value == 0)
        return availableMoves;
    }

    //find best available move
    function findBestMove() {
        let bestMove;
        if ((game.turnCounter == 1) && (game.gameBoard[4].value == 0)){
            bestMove = game.gameBoard[4];
        }
        else  {
            bestMove = winOrBlock();
        }
        updateCompMove(bestMove);
        return bestMove;
    }
    //Can the computer win or block?
    function winOrBlock(){
        let winMove;
        let blockMove;
        let winBlockFinalMove;
        let winKeys = Object.keys(win.winConditions)
        winKeys.forEach((key) => {
            //if comp can win
            if (win.winConditions[key] === 20){
                console.log(`I can win in ${key} next turn`)
                let possibilities = checkEmptySquare();
                console.log(possibilities)
                possibilities.forEach(square => {
                    if (square[key] == 1){
                        winMove = square;
                    }
                })
            }
            //cant win, it must block a win
            else if (win.winConditions[key] === 2){
                console.log(`I have to block in ${key} or I will lose`);
                let possibilities = checkEmptySquare();
                console.log(possibilities)
                possibilities.forEach(square => {
                    if (square[key] == 1){
                        blockMove = square;
                    }
                })
            }
        if (winMove){
            winBlockFinalMove = winMove
        }
        else if (blockMove){
            winBlockFinalMove = blockMove
        }
        //if no win or block move, randomly move
        else if (!winMove && !blockMove){
            let availableMoves = checkEmptySquare();
            let myMove = availableMoves.splice((Math.floor((Math.random() *availableMoves.length))), 1);
            winBlockFinalMove = myMove[0];
        }

        })
    return winBlockFinalMove
    }


    
    //play randomly (EASY MODE)
    function randomPlay(){
    let availableMoves = checkEmptySquare();
    let myMove = availableMoves.splice((Math.floor((Math.random() *availableMoves.length))), 1);
    updateCompMove(myMove[0]);
}

function updateCompMove(compMove){
    compMove.InnerContent(`${player.player2.marker}`)
    dom.inputs.topH2.innerHTML = `It is ${player.player1.name}'s turn now.`
    compMove.value = 10;
    win.updateWins(compMove);
    game.turnCounter++;
    win.checkForWin();
    game.PlayAgain();
}

    return {checkEmptySquare, findBestMove, winOrBlock, randomPlay, }
})();
