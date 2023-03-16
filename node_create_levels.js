const fs = require("fs");

const NUM_LEVELS = 10;
const LETTERS_PER_LEVEL = 25;

// Generate levels
const levels = [];
for (let i = 0; i < NUM_LEVELS; i++) {
  const level = [];
  for (let j = 0; j < LETTERS_PER_LEVEL; j++) {
    level.push(getRandomLetter());
  }
  levels.push(level);
}

// Save levels to file
fs.writeFile("levels.json", JSON.stringify(levels), (err) => {
  if (err) throw err;
  console.log(`Saved ${NUM_LEVELS} levels to levels.json`);
});

// Helper function to get a random letter
function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

