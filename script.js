document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let gameActive = true;
    let moves = 0;
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let playerXScore = 0;
    let playerOScore = 0;
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');
    let playerXName = '';
    let playerOName = '';
  
    function initGame() {
      playerXName = prompt('Enter name for Player X') || 'Player X';
      playerOName = prompt('Enter name for Player O') || 'Player O';
  
      document.getElementById('playerX').value = playerXName;
      document.getElementById('playerO').value = playerOName;
  
      resetGame();
    }
  
    function handleCellClick(cell) {
      const selectedCell = cell.target;
  
      if (!gameActive || selectedCell.textContent !== '') return;
  
      selectedCell.textContent = currentPlayer;
      moves++;
  
      if (checkWin()) {
        status.textContent = `Player ${getPlayerName(currentPlayer)} wins!`;
        updateScore();
        highlightWinningCells();
        gameActive = false;
        return;
      }
  
      if (moves === 9) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${getPlayerName(currentPlayer)}'s turn`;
    }
  
    function checkWin() {
      const cells = document.querySelectorAll('.board div');
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      const winningPattern = winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent !== '' &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent;
      });
  
      return winningPattern !== undefined;
    }
  
    function updateScore() {
      if (currentPlayer === 'X') {
        playerXScore++;
        playerXScoreElement.textContent = playerXScore;
      } else {
        playerOScore++;
        playerOScoreElement.textContent = playerOScore;
      }
    }
  
    function resetGame() {
      const cells = document.querySelectorAll('.board div');
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
        cell.classList.add('cell-background');
      });
  
      status.textContent = '';
      currentPlayer = 'X';
      gameActive = true;
      moves = 0;
  
      // Start the game with Player X's turn
      status.textContent = `Player ${getPlayerName(currentPlayer)}'s turn`;
    }
  
    function getPlayerName(symbol) {
      return symbol === 'X' ? playerXName : playerOName;
    }
  
    function highlightWinningCells() {
      const cells = document.querySelectorAll('.board div');
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      const winningPattern = winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent !== '' &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent;
      });
  
      if (winningPattern) {
        const [a, b, c] = winningPattern;
        cells[a].classList.add('winning-cell');
        cells[b].classList.add('winning-cell');
        cells[c].classList.add('winning-cell');
      }
    }
  
    // Initialize the game when the page loads
    initGame();
  
    // Create the game board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell-background');
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  
    // Add event listener for the reset button
    document.getElementById('resetButton').addEventListener('click', resetGame);
  });
  