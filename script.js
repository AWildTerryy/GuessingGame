const animals = ['bird','cat','dog'];

const animalContainer = document.getElementById('animal-container');
const buttonContainer = document.getElementById('button-container');
const resultMessage = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const roundsDisplay = document.getElementById('rounds');
const restartBtn = document.getElementById('restart-btn');
const searchParams = new URLSearchParams(window.location.search);

let score = 0;
let currentRound = 0;
let currentAnimal;

function getRandomAnimal() {
    return animals[Math.floor(Math.random() * animals.length)];
}

function createAnimalImage(animal) {
    const img = document.createElement('img');
    if (searchParams.get('difficulty') == 'medium') {img.src = `pixelated-48x48-${animal}.jpg`;}
    else if (searchParams.get('difficulty') == 'hard'){img.src = `pixelated-32x32-${animal}.jpg`;}
    else{img.src = `${animal}.jpg`;}
    img.alt = animal;
    img.classList.add('animal-image');
    return img;
}

function createButton(animal) {
    const button = document.createElement('button');
    button.textContent = animal;
    button.addEventListener('click', () => checkGuess(animal));
    return button;
}

function displayAnimal() {
    currentAnimal = getRandomAnimal();
    animalContainer.innerHTML = '';
    animalContainer.appendChild(createAnimalImage(currentAnimal));

    buttonContainer.innerHTML = '';
    animals.forEach(animal => {
        const button = createButton(animal);
        buttonContainer.appendChild(button);
    });
}

function checkGuess(guessedAnimal) {
    if (guessedAnimal === currentAnimal) {
        resultMessage.textContent = 'Correct!';
        score++;
        scoreDisplay.textContent = score;
    } else {
        resultMessage.textContent = 'Wrong...';
    }
    currentRound++;
    if (currentRound < 10) {
        roundsDisplay.textContent = currentRound+1;
        displayAnimal ();
    } else {
        endGame();
    }
}

function endGame() {
    resultMessage.textContent = `Game Over! Final Score: ${score}.`;
    buttonContainer.innerHTML = '';
}

restartBtn.addEventListener('click', () => {
    // Redirect user to the home page to restart the game
    window.location.href = 'index.html';
});

window.addEventListener('load', () => {
    displayAnimal();
});
