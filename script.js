const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameGrid = document.getElementById('game-grid');
const restartBtn = document.getElementById('restartBtn');
const difficultySelect = document.getElementById('difficulty');

const popSound = document.getElementById('popSound');
const bombSound = document.getElementById('bombSound');
const powerupSound = document.getElementById('powerupSound');

let score = 0;
let time = 30;
let moleTimer;
let countdownTimer;
let spawnRate = 800;

// Create 9 grid cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameGrid.appendChild(cell);
}

// Difficulty settings
function setDifficulty() {
    const diff = difficultySelect.value;
    if (diff === 'easy') spawnRate = 1000;
    if (diff === 'medium') spawnRate = 800;
    if (diff === 'hard') spawnRate = 500;
}

// Spawn random mole type
function spawnMole() {
    document.querySelectorAll('.cell').forEach(c => c.innerHTML = '');
    const cells = document.querySelectorAll('.cell');
    const randomIndex = Math.floor(Math.random() * cells.length);
    const cell = cells[randomIndex];

    const rand = Math.random();
    let moleType = 'mole';
    if (rand < 0.1) moleType = 'golden';
    else if (rand < 0.2) moleType = 'bomb';
    else if (rand < 0.25) moleType = 'powerup';

    const mole = document.createElement('div');
    mole.classList.add(moleType);
    cell.appendChild(mole);

    mole.addEventListener('click', () => {
        switch (moleType) {
            case 'mole': score += 1; popSound.play(); break;
            case 'golden': score += 5; popSound.play(); break;
            case 'bomb': score -= 3; time -= 5; bombSound.play(); break;
            case 'powerup': time += 5; powerupSound.play(); break;
        }
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
        alert(`Game Over! Final Score: ${score}`);
    }
}

// Start game
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    setDifficulty();

    clearInterval(moleTimer);
    clearInterval(countdownTimer);
    moleTimer = setInterval(spawnMole, spawnRate);
    countdownTimer = setInterval(countdown, 1000);
}

restartBtn.addEventListener('click', startGame);
difficultySelect.addEventListener('change', setDifficulty);

// Auto-start
startGame();
