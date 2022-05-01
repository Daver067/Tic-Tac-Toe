    /*************************************************************************************
     * *****module for anything to do with the DOM manipulation
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
        squareSelected.InnerContent("X");
        squareSelected.value = 1;
        }
        else {
            squareSelected.InnerContent("O")
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

    // reset game
    function resetGame(){
        while (dom.inputs.container.firstChild){
            dom.inputs.container.removeChild(dom.inputs.container.firstChild)
        }
        game.gameBoard = []
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
                alert("X wins the game!")
                win.winner = true;
                return;
            }
            else if (win.winConditions[key] === 30){
                alert("O wins the game")
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
        
    })();
