    /*************************************************************************************
     * *****module for anything to do with the DOM manipulation (this didnt really work as planned...)
    ************************************************************************************ */
const dom = (() => {
    let inputs = {
    container: document.querySelector('.container'),
    playerSelection: document.querySelector('.playerSelection'),

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
        if (squareSelected.value != 0) {
            alert("You must play in an un-occupied square");
            return;
        }
        if ((game.turnCounter == 0) || (game.turnCounter % 2 == 0)){
        squareSelected.InnerContent(`${player.player1.marker}`);
        squareSelected.value = 1;
        }
        else {
            squareSelected.InnerContent(`${player.player2.marker}`)
            squareSelected.value = 10;
        }
        win.updateWins(squareSelected);
        game.turnCounter++;
        win.checkForWin();

    }


    //building game board function
    function makeSection(section){
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
        }
        }
        //adding event listener to the newly created div
        createNewSquare.addEventListener('click', function(){selectSquare(tic_tac_toe_square)})

        return tic_tac_toe_square;
    }

    
    // the game board setup
    let gameBoard = [
    new makeSection("topLeft"),
    new makeSection("topMid"),
    new makeSection("topRight"),
    new makeSection("midLeft"),
    new makeSection("midMid"),
    new makeSection("midRight"),
    new makeSection("bottomLeft"),
    new makeSection("bottomMid"),
    new makeSection("bottomRight"),
]

//function to reset the gameBoard
    function resetGameBoard(){
        game.gameBoard = [];
        game.gameBoard = [
            new makeSection("topLeft"),
            new makeSection("topMid"),
            new makeSection("topRight"),
            new makeSection("midLeft"),
            new makeSection("midMid"),
            new makeSection("midRight"),
            new makeSection("bottomLeft"),
            new makeSection("bottomMid"),
            new makeSection("bottomRight"),
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

    return {gameBoard, turnCounter, resetGame};
    })();


/*********************************************************************************************
 *****module for end game conditions
 ****************************************************************************************** */
const win = (()=>{


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
                alert(`${player.player1.name} wins the game!` )
                win.winner = true;
                return;
            }
            else if (win.winConditions[key] === 30){
                alert(`${player.player2.name} wins the game`)
                win.winner = true;
                return;
            }
        });
        if (game.turnCounter === 9 && win.winner != true){
            alert("it was a draw")
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
        let player1ResetButton = document.getElementById("reset1");
        let player2LockButton = document.getElementById("submit2");
        let player2ResetButton = document.getElementById("reset2");
        let player1Marker = document.getElementById("marker1");
        let player2Marker = document.getElementById("marker2");
        let player1Name = document.getElementById("name1");
        let player2Name = document.getElementById("name2");
        let player1CatchPhrase = document.getElementById("phrase1");
        let player2CatchPhrase = document.getElementById("phrase2");
        
        function sameMarkers(){
            if (player1.marker == player2.marker){
                alert("choose different markers")
                player1.chose = false;
                player2.chose = false;
                player1LockButton.addEventListener('click', lockPlayer1Handler)
                player2LockButton.addEventListener('click', lockPlayer2Handler)
            }
        }

        function bothPlayersLocked(){
            sameMarkers();
            if ((player1.chose == true) && (player2.chose == true)){
                dom.inputs.playerSelection.classList.toggle('hidden');
                dom.inputs.container.classList.toggle('hidden');
            }
            else return;
        }

        let lockPlayer1Handler = function(){
            player1.name = player1Name.value;
            player1.marker = player1Marker.value;
            player1.catchPhrase = player1CatchPhrase.value;
            player1.chose = true;
            console.log(player1);
            player1LockButton.removeEventListener('click', lockPlayer1Handler);
            bothPlayersLocked()

        }
        let lockPlayer2Handler = function(){
            player2.name = player2Name.value;
            player2.marker = player2Marker.value;
            player2.catchPhrase = player2CatchPhrase.value;
            player2.chose = true;
            console.log(player2);
            player2LockButton.removeEventListener('click', lockPlayer2Handler);
            bothPlayersLocked()
        }

        player1LockButton.addEventListener('click', lockPlayer1Handler)
        player2LockButton.addEventListener('click', lockPlayer2Handler)
        
        
        return {player1, player2}

    })();
