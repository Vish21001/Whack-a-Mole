const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameGrid = document.getElementById('game-grid');
const restartBtn = document.getElementById('restartBtn');

let score = 0;
let time = 30; // 30 seconds game
let moleTimer;
let countdownTimer;

// Create 9 grid cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameGrid.appendChild(cell);
}

// Pick a random cell for mole
function spawnMole() {
    document.querySelectorAll('.cell').forEach(c => c.innerHTML = '');
    const cells = document.querySelectorAll('.cell');
    const randomIndex = Math.floor(Math.random() * cells.length);
    const mole = document.createElement('div');
    mole.classList.add('mole');
    cells[randomIndex].appendChild(mole);

    // Click handler
    mole.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        mole.remove();
    });
}

// Countdown timer
function countdown() {
    time--;
    timeDisplay.textContent = time;
    if (time <= 0) {
        clearInterval(moleTimer);
        clearInterval(countdownTimer);
        alert(`Game Over! Your Score: ${score}`);
    }
}

// Start game
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    moleTimer = setInterval(spawnMole, 800); // Mole every 0.8 seconds
    countdownTimer = setInterval(countdown, 1000);
}

restartBtn.addEventListener('click', () => {
    clearInterval(moleTimer);
    clearInterval(countdownTimer);
    startGame();
});

// Auto-start
startGame();
