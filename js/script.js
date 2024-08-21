const grid = document.querySelector('.grid');
const playButton = document.querySelector('.play');

const difficultyArray = [100, 81, 49];
const totalBombs = 16;
const bombList = [];

let score = 0;
let maxSquares;
let win = false;

playButton.addEventListener('click', play);

function play(){
  const difficulty = parseInt(document.getElementById('difficulty').value);
  
  if(difficulty >= 0 && difficulty <= 2) {
    if(playButton.textContent === 'Play') {
      playButton.textContent = 'Reset';
      playButton.className = 'btn btn-outline-danger';
    }
    reset();
    setMaxSquares(difficulty);
    createBombs();
    console.log(bombList);
    createGrid();
  } else {
    alert("Seleziona una difficoltà valida");
  }
}

// Funzione per calcolare numero celle
function setMaxSquares(difficultyValue) {
  maxSquares = difficultyArray[difficultyValue];
}

// Funzione per creare le bombe
function createBombs() {
  bombList.splice(0); // Svuota la lista delle bombe
  while (bombList.length < totalBombs) {
    const number = Math.floor(Math.random() * maxSquares) + 1;
    if (!bombList.includes(number)) bombList.push(number);
  }
  bombList.sort((a, b) => a - b); // Ordina i numeri in ordine crescente
}

// Funzione per creare la griglia
function createGrid() {
  grid.innerHTML = '';
  grid.className = 'grid' + maxSquares;
  for (let i = 1; i <= maxSquares; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    // Aggiungi data-id per identificare la cella
    cell.setAttribute('data-id', i);
    
    cell.addEventListener('click', function(){
      if (cell.classList.contains('cell-clicked')) return;
      
      if (bombList.includes(i)){
        cell.classList.add('cell-bomb');
        cell.innerHTML += `<i class="fa-solid fa-land-mine-on" style="color: black;"></i>`;
        showBombs();
        printResult();
      } else {
        cell.classList.add('cell-clicked');
        score++;
        checkWin();
      }
    });
    grid.appendChild(cell);
  }
}

// Funzione per mostrare tutte le bombe
function showBombs() {
  const allCell = document.querySelectorAll('.cell');

  for (let i = 0; i < allCell.length; i++) {
    const cellID = parseInt(allCell[i].getAttribute('data-id'));
    if (bombList.includes(cellID)) {
      allCell[i].classList.add('cell-bomb');
      allCell[i].innerHTML = '<i class="fa-solid fa-land-mine-on" style="color: black;"></i>';
    }
  }
}

// Funzione per controllare se il giocatore ha vinto
function checkWin() {
  if (score === (maxSquares - totalBombs)) {
    win = true;
    printResult(win);
  }
}

// Funzione per stampare il risultato
function printResult(win = false) {
  const message = document.createElement('div');
  message.className = 'game-end';

  if (win) {
    message.classList.add('win');
    message.innerHTML = 
    `
    Hai Vinto!<br>
    Il tuo punteggio è:<br>
    ${score}/${maxSquares - totalBombs}
    `;
  } else {
    message.classList.add('lose');
    message.innerHTML = 
    `
    Hai Perso!<br>
    Il tuo punteggio è:<br>
    ${score}/${maxSquares - totalBombs}
    `;
  }

  grid.append(message);
}

// Funzione di reset della griglia
function reset() {
  grid.innerHTML = '';
  bombList.splice(0);
  score = 0;
  win = false;
}
