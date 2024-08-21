const grid = document.querySelector('.grid');
const playButton = document.querySelector('.play');

const difficultyArray = [100, 81, 49];
const totalBombs = 16;
const bombList = [];

playButton.addEventListener('click', play);

function play(){
  
  const difficulty = document.getElementById('difficulty').value;
  
  if(difficulty <= 2) {
    if(playButton.textContent === 'Play') {
      playButton.textContent = 'Reset';
      playButton.className = 'btn btn-outline-danger';
    }
    reset();
    setMaxSquares(difficulty);
    createBombs();
    console.log(bombList);
    createGrid();
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
        alert('Hai Perso');
        showBombs();
      } else {
        cell.classList.add('cell-clicked');
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


// Funzione di reset della griglia
function reset() {
  grid.innerHTML = '';
  bombList.splice(0);
}