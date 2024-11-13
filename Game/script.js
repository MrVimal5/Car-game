const car = document.getElementById('car');
const fuel = document.getElementById('fuel');
const rock = document.getElementById('rock');
const scoreDisplay = document.getElementById('score');
let score = 0;
let carPosition = 125; // Starting position of the car
let gameInterval;
let gameSpeed = 5; // Speed of object movement

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && carPosition > 0) {
        carPosition -= 20;
    } else if (event.key === 'ArrowRight' && carPosition < 250) {
        carPosition += 20;
    }
    car.style.left = `${carPosition}px`;
});

function startGame() {
    // Place initial objects randomly
    resetObject(fuel, 'fuel');
    resetObject(rock, 'rock');

    gameInterval = setInterval(() => {
        moveObject(fuel, 'fuel');
        moveObject(rock, 'rock');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let carRect = car.getBoundingClientRect();
    let fuelRect = fuel.getBoundingClientRect();
    let rockRect = rock.getBoundingClientRect();

    // Check collision with fuel
    if (carRect.left < fuelRect.right &&
        carRect.right > fuelRect.left &&
        carRect.top < fuelRect.bottom &&
        carRect.bottom > fuelRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(fuel, 'fuel');
    }

    // Check collision with rock
    if (carRect.left < rockRect.right &&
        carRect.right > rockRect.left &&
        carRect.top < rockRect.bottom &&
        carRect.bottom > rockRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();