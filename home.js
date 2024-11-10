// let currentIndex = 0;
const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");

let cardsWithIndex = [];
let dotsWithIndex = [];

function updateCards(upOrDown) {
  if (upOrDown != "up" && upOrDown != "down") {
    // init cardsWithIndex
    cardsWithIndex = Array.from(cards).map((card, index) => {
      return { card, index };
    });

    //init dotsWithIndex
    dotsWithIndex = Array.from(dots).map((dot, index) => {
      return { dot, index };
    });

    console.log(dotsWithIndex);
  }

  updateDots(upOrDown);

  cardsWithIndex = cardsWithIndex.map(({ card, index }) => {
    if (upOrDown == "up") {
      index += 1;
    } else if (upOrDown == "down") {
      index -= 1;
    }

    if (index == cards.length) {
      index = 0;
    } else if (index == -1) {
      index = cards.length - 1;
    }

    const leftPosition = index * (100 / 3) + "%";
    card.style.left = leftPosition;

    card.classList.remove("active");

    if (index == 1) {
      card.classList.add("active");
    }

    return { card, index };
  });
}

function updateDots(upOrDown) {
  dotsWithIndex = dotsWithIndex.map(({ dot, index }) => {
    console.log("dot = ", dot);
    console.log("index = ", index);

    if (upOrDown == "up") {
      index -= 1;
    } else if (upOrDown == "down") {
      index += 1;
    }

    if (index == dots.length) {
      index = 0;
    } else if (index == -1) {
      index = dots.length - 1;
    }

    console.log("dot = ", dot);
    console.log("index = ", index);

    dot.classList.remove("active");

    if (index == 0) {
      dot.classList.add("active");
    }

    return { dot, index };
  });
}

function nextSlide() {
  updateCards("up");
}

function prevSlide() {
  updateCards("down");
}

// Initialiseer de actieve kaart bij laden
updateCards();
