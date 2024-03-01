const grid = document.querySelector('.grid');
const playButton = document.querySelector('.play');

const totalCells = 100;

playButton.addEventListener('click', play);

function play(){
  grid.innerHTML = '';
  for(let i = 1; i <= totalCells; i++){
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerHTML += `<div class="num">${[i]}</div>`;

    cell.addEventListener('click', function(){
      if (cell.classList.contains('cell-clicked')) return;

      cell.classList.add('cell-clicked');

      let numElement = this.querySelector('.num');
      let num = numElement.textContent;
      console.log(num);
    });

    grid.appendChild(cell);
  }
}