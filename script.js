const BOARD_SIZE = 500;
const input = document.getElementById("dimensionInput");
const board = document.getElementById("board");
let dimension = 0;
let MAX = 20;

board.style.width = `${BOARD_SIZE}px`;
board.style.height = `${BOARD_SIZE}px`;

input.addEventListener("input", (ev) => {
  dimension = ev.target.value;

  if (dimension > MAX) {
    dimension = MAX;
  }

  createBoard(dimension);
});

function createBoard(_dimension) {
  board.innerHTML = '';
  const primes = sieve(_dimension);

  let oddColor = "square--white";
  let evenColor = "square--black";
  for (let i = 0; i < _dimension * _dimension; i++) {
    const square = document.createElement("div");

    if (i % dimension === 0) {
      const swap = oddColor;
      oddColor = evenColor;
      evenColor = swap;
    }

    square.classList.add("square");

    square.style.width = `${BOARD_SIZE / _dimension}px`;
    square.style.height = `${BOARD_SIZE / _dimension}px`;

    if (i % dimension % 2 === 0) {
      square.classList.add(evenColor);
    } else {
      square.classList.add(oddColor);
    }

    square.textContent = i + 1;

    if (primes[i + 1]) {
      const pawn = document.createElement("div");
      pawn.classList.add("pawn");

      pawn.style.width = `${BOARD_SIZE / _dimension / 2}px`;
      pawn.style.height = `${BOARD_SIZE / _dimension / 2}px`;

      square.appendChild(pawn);
    }

    board.appendChild(square);
  }
}

function sieve(_dimension) {
  let primes = Array(_dimension * _dimension + 1).fill(true);

  for (let i = 2; i <= _dimension; i++) {
    if (primes[i]) {
      for (let j = i * i; j < primes.length; j += i) {
        primes[j] = false;
      }
    }
  }

  return primes;
}
