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
  grandmother: { count: 0, cps: 1, cost: 100, baseCost: 10 },
  baker: { count: 0, cps: 10, cost: 500, baseCost: 50 },
  factory: { count: 0, cps: 100, cost: 5000, baseCost: 5000 },
};

// Load saved game (if any)
loadGame();

// Update the UI
function updateDisplay() {
  cookieCounter.textContent = counter;
  cookiesPerSec.textContent = `${cps}/s`;

  // Update shop button labels
  grandmotherBtn.textContent = `Grandmother ${items.grandmother.cost} (Owned: ${items.grandmother.count})`;
  bakerBtn.textContent = `Baker ${items.baker.cost} (Owned: ${items.baker.count})`;
  factoryBtn.textContent = `Factory ${items.factory.cost} (Owned: ${items.factory.count})`;

  // Enable/disable buttons based on affordability
  grandmotherBtn.disabled = counter < items.grandmother.cost;
  bakerBtn.disabled = counter < items.baker.cost;
  factoryBtn.disabled = counter < items.factory.cost;
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
    // increase the cost with each buy by 15%
    item.cost = Math.floor(item.cost * 1.15);
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

// ---- AUTO-SAVE LOOP ---- //
setInterval(saveGame, 10000); // every 10 seconds

// Reset Game
resetBtn.addEventListener("click", function () {
  // Reset game stats
  counter = 0;
  cps = 0;

  // reset all items
  for (let key in items) {
    items[key].count = 0;
    items[key].cost = items[key].baseCost;
  }

  // clear save
  localStorage.removeItem("cookieGame");
  updateDisplay();
});

// Save Game
function saveGame() {
  let gameState = {
    counter,
    cps,
    items: JSON.parse(JSON.stringify(items)), // deep copy
  };
  localStorage.setItem("cookieGame", JSON.stringify(gameState));
}

// Load game
function loadGame() {
  const savedGame = JSON.parse(localStorage.getItem("cookieGame"));
  if (savedGame) {
    counter = savedGame.counter;
    cps = savedGame.cps;
    items = savedGame.items;
  }
  updateDisplay();
}

// Save when leaving the page
window.addEventListener("beforeunload", saveGame);
