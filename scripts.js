const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => card.classList.add('shuffle'));

  const orderArray = Array.from({ length: cards.length }, (_, i) => i);
  for (let i = orderArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [orderArray[i], orderArray[j]] = [orderArray[j], orderArray[i]];
  }
  cards.forEach((card, i) => {
    card.style.order = orderArray[i];
  });

  setTimeout(() => {
    cards.forEach(card => card.classList.remove('shuffle'));
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  shuffle();
});

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipAll() {
  cards.forEach((card) => card.classList.add("flip"));
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip"));
  }, 10000);
}

function resetGame() {
  cards.forEach((card) => card.classList.remove("flip"));
  shuffle();
}

const keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
  const columns = ["1", "2", "3", "4"];
  if (keysPressed["a"] && columns.includes(event.key)) {
    document.querySelector(`.memory-card[style='order: ${Number(event.key - 1)};']`).click();
  }
  if (keysPressed["b"] && columns.includes(event.key)) {
    document.querySelector(`.memory-card[style='order: ${Number(event.key - 1) + 4};']`).click();
  }
  if (keysPressed["c"] && columns.includes(event.key)) {
    document.querySelector(`.memory-card[style='order: ${Number(event.key - 1) + 8};']`).click();
  }
  if (event.key === "[") {
    flipAll();
  }
  if (event.key === "]") {
    resetGame();
  }
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});