// No JS
let level = 1;
const maxLevel = 20;
let timer;
let seconds = 0;
let minutes = 0;
let answerTimeout;

function startGame() {
    level = 1;
    seconds = 0;
    minutes = 0;
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    startTimer();
    showFloatingWindow();
    generateQuestion();
}

function restartGame() {
    level = 1;
    seconds = 0;
    minutes = 0;
    document.getElementById('current-level').innerText = level;
    document.getElementById('feedback').innerText = '';
    startTimer();
    generateQuestion();
}

function generateQuestion() {
    clearTimeout(answerTimeout); // Limpiar cualquier temporizador previo
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1 = Math.floor(Math.random() * 100) + 1;
    let num2 = Math.floor(Math.random() * 100) + 1;
    let correctAnswer;

    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Para la división, asegurar que num1 es múltiplo de num2 y que num2 no es cero
            num2 = Math.floor(Math.random() * 10) + 1; // num2 no será cero y será un número más pequeño
            num1 = num2 * Math.floor(Math.random() * 10) + 1; // num1 será múltiplo de num2
            correctAnswer = num1 / num2;
            break;
    }

    document.getElementById('question').innerText = `${num1} ${operation} ${num2}`;
    document.getElementById('answer').dataset.correctAnswer = correctAnswer;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';

    const pokemon1 = Math.floor(Math.random() * 150) + 1;
    const pokemon2 = Math.floor(Math.random() * 150) + 1;

    document.getElementById('pokemon-images').innerHTML = `
        <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon1}.png" alt="Pokémon 1">
            <p>Valor: ${num1}</p>
        </div>
        <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon2}.png" alt="Pokémon 2">
            <p>Valor: ${num2}</p>
        </div>
    `;
}

function checkAnswer() {
    clearTimeout(answerTimeout); // Limpiar el temporizador si el usuario ingresa una respuesta
    const answer = parseInt(document.getElementById('answer').value);
    const correctAnswer = parseInt(document.getElementById('answer').dataset.correctAnswer);
    
    if (answer === correctAnswer) {
        document.getElementById('feedback').innerText = '¡Correcto!';
        setTimeout(levelUp, 2000); // Avanzar al siguiente nivel después de 2 segundos
    } else {
        document.getElementById('feedback').innerText = 'Intenta de nuevo';
        answerTimeout = setTimeout(() => {
            document.getElementById('feedback').innerText = `La respuesta correcta es: ${correctAnswer}`;
            setTimeout(levelUp, 2000); // Avanzar al siguiente nivel después de 2 segundos
        }, 2000); // Mostrar la respuesta correcta después de 2 segundos
    }
}

function levelUp() {
    level++;
    if (level > maxLevel) {
        document.getElementById('feedback').innerText = '¡Felicidades! Has completado todos los niveles.';
    } else {
        document.getElementById('current-level').innerText = level;
        generateQuestion();
    }
}

function startTimer() {
    clearInterval(timer); // Limpiar cualquier temporizador previo
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        document.getElementById('minutes').innerText = minutes;
    }, 1000);
}

function showFloatingWindow() {
    const pokemonId = Math.floor(Math.random() * 150) + 1;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    const floatingWindow = document.getElementById('floating-window');
    document.getElementById('floating-pokemon').src = imageUrl;
    floatingWindow.style.display = 'flex';

    setTimeout(() => {
        floatingWindow.style.display = 'none';
    }, 5000); // La ventana flotante desaparecerá después de 5 segundos
}
