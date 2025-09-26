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

// Items object
let items = {
  grandmother: { count: 0, cps: 1, cost: 10 },
  baker: { count: 0, cps: 10, cost: 50 },
  factory: { count: 0, cps: 100, cost: 5000 },
};

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

// Buy function
function buyItem(itemKey) {
  let item = items[itemKey];
  if (counter >= item.cost) {
    counter -= item.cost; // pay cookies
    item.count++; // own one more
    cps += item.cps;
    updateDisplay();
  }
}

// Shop buttons
grandmotherBtn.addEventListener("click", function () {
  buyItem("grandmother");
});
bakerBtn.addEventListener("click", function () {
  buyItem("baker");
});
factoryBtn.addEventListener("click", function () {
  buyItem("factory");
});

// ---- SINGLE GAME LOOP ---- //
setInterval(() => {
  counter += cps;
  updateDisplay();
}, 1000);

// Reset Game
resetBtn.addEventListener("click", function () {
  // Reset game stats
  counter = 0;
  cps = 0;
  updateDisplay();

  for (let key in items) {
    items[key].count = 0; // reset all items
  }
  updateDisplay();
});
