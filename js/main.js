/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

let game;

class Player {
  constructor(token) {
    this.token = token;
  }
}

// Tic Tac Toe Game Class
class TicTacToe {
  constructor() {
    // TODO: Set up `this.player1` and `this.player2` properties.
    // These properties should be new Player class instances.
    // You may set the "token" to anything that corresponds to a Icon
    // icon name ('heart', 'star', 'remove-sign', 'unchecked', 'bell',
    // 'certificate', etc.)
    this.currentPlayer = null;
    this.gameStatus = null;
    this.winner = null;
    this.moveCount = 0;
    // TODO: Set up DOM elements used in game as Class properties

    this.startPrompt = document.querySelector('#start-prompt');
    this.movePrompt = document.querySelector('#move-prompt');
    this.currentPlayerToken = document.querySelector('#player-token');
    this.gameboard = document.querySelector('#gameboard');
    this.winScreen = document.querySelector('#win-screen');
    this.winnerToken = document.querySelector('#winner-token');
    this.drawScreen = document.querySelector('#draw-screen');
    this.gameState = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    // Array of Win States
    // This is provided for you. Each of these arrays represents the ways
    // a player can win Tic Tac Toe. Each item in the array is another
    // array. Each of those arrays contains a set of (X, Y) coordinates.
    // If a player has claimed the tile at each of the coordinates listed in
    // one of the win states, then they have won the game.
    this.winStates = [
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2]
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1]
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2]
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0]
      ]
    ];
  }
  // This `checkForWinner()` method is provided for you, but you must fill in
  // the event dispatch lines that cause the end game screens to show.
  checkForWinner() {
    for (let condition of this.winStates) {
      let winningCondition = true;
      for (let position of condition) {
        if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
          winningCondition = false;
        }
      }
      if (winningCondition) {
        console.log('We have a winner!');
        console.log(`Condition is: ${condition}`);
        this.gameStatus = 'won';
        this.winner = this.currentPlayer;
        // If we've gotten here, then we need to createa  `win` event and
        // dispatch it.
        let winEvent = new Event('win');
        document.dispatchEvent(winEvent);
        return true; // Return a value to stop processing the additional move count check.
      }
    }
    this.moveCount++;
    console.log(`Reviewed move ${this.moveCount}.`)
    if (this.moveCount >= 9) {
      console.log(`This game is a draw at ${this.moveCount} moves.`);
      this.gameStatus = 'draw';
      let drawEvent = new Event('draw');
      document.dispatchEvent(drawEvent);
    }
  }

  recordMove(event) {
    let tile_x = event.target.dataset.x;
    let tile_y = event.target.dataset.y;
    if (!this.gameState[tile_x][tile_y]) {
      this.gameState[tile_x][tile_y] = this.currentPlayer.token;
      event.target.setAttribute('class', `tile played fas fa-${this.currentPlayer.token}`)
    } else {
      return false;
    }
  }
  switchPlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
    this.currentPlayerToken.setAttribute('class', `fas fa-${this.currentPlayer.token}`);
  }
  setUpTileListeners() {
    let tileElements = document.querySelectorAll('.tile');
    for (const tile of tileElements) {
      tile.addEventListener('click', handleMove);
    }
  }
  showWinScreen() {
    this.winScreen.setAttribute('class', 'show');
    this.winnerToken.setAttribute('class', `fas fa-${this.currentPlayer.token}`);
  }
  showDrawScreen() {
    this.drawScreen.setAttribute('class', 'show');
  }
  setUpBoard() {
    this.gameboard.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      let newRow = document.createElement('div');
      newRow.setAttribute('class', 'row');
      for (let j = 0; j < 3; j++) {
        let newCol = document.createElement('div');
        newCol.setAttribute('class', 'col-xs-3');
        let newTile = document.createElement('span');
        newTile.setAttribute('class', 'fas fa-question-sign tile');
        newTile.setAttribute('data-x', i);
        newTile.setAttribute('data-y', j);
        newCol.appendChild('newTile');
        newRow.appendChild('newCol');
      }
      this.gameboard.appendChild('newRow');
    }
    this.setUpTileListeners();
  }
  initializeMovePrompt() {
    // This method initializes the `this.movePrompt` element.
    this.startPrompt.setAttribute('class', 'hidden');
    this.movePrompt.setAttribute('class', '');
    this.currentPlayer = this.player1;
    this.currentPlayerToken.setAttribute('class', `fas fa-${this.currentPlayerToken}`);
  }
  start() {
    console.log('start game');
    // This method handles the logic to create a new game. It primarily has
    // two duties in the basic version of the game:
    this.setUpBoard();
    console.log('set up board');
    this.initializeMovePrompt();
    console.log('init move prompt');
  }
} 
document.addEventListener('DOMContentLoaded', (event) => {

  // TODO: Inside the "DOMContentLoaded" event handler, perform the following
  // steps:

  let startButton = document.querySelector('#start-button');
  startButton.addEventListener('click', (even) => {
    game = new TicTacToe();
    game.start();
  });
});


document.addEventListener('win', (event) => {
  console.log('win event fired');
  game.showWinScreen();
})

document.addEventListener('draw', (event) => {
  console.log('draw event fired');
  game.showDrawScreen;
})

// External function for event listeners provided for you.
function handleMove(event) {
  // Record the move for the current player.
  game.recordMove(event);

  // Check to see if the last move was a winning move.
  game.checkForWinner();

  // Rotate players.
  game.switchPlayer();
}