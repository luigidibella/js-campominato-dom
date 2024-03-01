const grid = document.querySelector('.grid');
const playButton = document.querySelector('.play');

const totalCells = 100;
const totalBombs = 16;
const bombList = [];

while (bombList.length < totalBombs) {
  const number = Math.floor(Math.random() * totalCells) + 1;
  if (!bombList.includes(number)) bombList.push(number);
}

console.log(bombList);

playButton.addEventListener('click', play);

function play(){
  grid.innerHTML = '';
  for (let i = 1; i <= totalCells; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerHTML += `<div class="num">${[i]}</div>`;

    cell.addEventListener('click', function(){
      if (cell.classList.contains('cell-clicked')) return;

      /* cell.classList.add('cell-clicked'); */

      /* let numElement = this.querySelector('.num');
      let num = numElement.textContent;
      console.log(num); */

      if (bombList.includes(i)) {
        cell.classList.add('cell-bomb');
        alert('Hai Perso');
        location.reload();
      } else {
        cell.classList.add('cell-clicked');
      }
    });

    grid.appendChild(cell);
  }
}