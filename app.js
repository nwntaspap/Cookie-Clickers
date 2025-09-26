// DOM Elements
const cookieCounter = document.getElementById("counter");
const cookiesPerSec = document.getElementById("cps");
const btnImage = document.getElementById("cookie");
const grandmotherBtn = document.getElementById("item-1");
const bakerBtn = document.getElementById("item-2");
const factoryBtn = document.getElementById("item-3");
const resetBtn = document.getElementById("resetBtn");

// Game state
let counter = 0;
let cps = 0;

// Keep the intervals so we can clear them later
let intervals = [];

// Update the UI
function updateDisplay() {
  cookieCounter.textContent = counter;
  cookiesPerSec.textContent = `${cps}/s`;
}
updateDisplay();

// Cookie click
btnImage.addEventListener("click", function () {
  counter++;
  updateDisplay();
});

//---- Shop items ----//
// Grandmother Btn
grandmotherBtn.addEventListener("click", function () {
  if (counter >= 100) {
    counter -= 100;
    cps += 1;
    updateDisplay();

    // add 1 cookie per sec
    let intervalId = setInterval(() => {
      counter++;
      updateDisplay();
    }, 1000);

    intervals.push(intervalId);
  }
});

// Baker Btn
bakerBtn.addEventListener("click", function () {
  if (counter >= 500) {
    counter -= 500;
    cps += 10;
    updateDisplay();

    let intervalId = setInterval(() => {
      counter += 10;
      updateDisplay();
    }, 1000);

    intervals.push(intervalId);
  }
});

// Factory Btn
factoryBtn.addEventListener("click", function () {
  if (counter >= 5000) {
    counter -= 5000;
    cps += 100;
    updateDisplay();

    let intervalId = setInterval(() => {
      counter += 100;
      updateDisplay();
    }, 1000);

    intervals.push(intervalId);
  }
});

// Reset Game
resetBtn.addEventListener("click", function () {
  // To clear the intervals we need their ID
  intervals.forEach((intervalId) => clearInterval(intervalId));

  // Reset game stats
  counter = 0;
  cps = 0;
  updateDisplay();

  // Clear the intervals array
  intervals = [];
});
