// Define variables
const gameContainer = document.querySelector(".game");
const scoreDisplay = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const hintBtn = document.querySelector("#hint-btn");

let score = 0;
let timer = 30;
let dots = [];

// Generate game grid
function generateGrid() {
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.innerText = getRandomLetter();
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", selectDot);
    dots.push(dot);
    gameContainer.appendChild(dot);
  }
}

// Get random letter
function getRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Select dot
function selectDot() {
  const selectedDot = this;
  const selectedIndex = parseInt(selectedDot.getAttribute("data-index"));
  const connectedDots = getConnectedDots(selectedIndex);
  
  // Check if selected dot is already connected
  if (selectedDot.classList.contains("connected")) {
    return;
  }
  
  // Connect dots
  if (connectedDots.length > 1) {
    connectedDots.forEach(dot => {
      dot.classList.add("connected");
    });
    score += connectedDots.length;
    scoreDisplay.innerText = score;
  }
  
  // Clear selection
  dots.forEach(dot => {
    dot.classList.remove("selected");
  });
  
  // Check if game is over
  if (score === 125) {
    gameOver(true);
  } else if (timer === 0) {
    gameOver(false);
  }
}

// Get connected dots
function getConnectedDots(index) {
  const connectedDots = [dots[index]];
  const row = Math.floor(index / 5);
  const col = index % 5;
  
  // Check left
  if (col > 0) {
    const leftIndex = index - 1;
    if (dots[leftIndex].innerText === connectedDots[0].innerText) {
      connectedDots.push(dots[leftIndex]);
    }
  }
  
  // Check right
  if (col < 4) {
    const rightIndex = index + 1;
    if (dots[rightIndex].innerText === connectedDots[0].innerText) {
      connectedDots.push(dots[rightIndex]);
    }
  }
  
  // Check top
  if (row > 0) {
    const topIndex = index - 5;
    if (dots[topIndex].innerText === connectedDots[0].innerText) {
      connectedDots.push(dots[topIndex]);
    }
  }
  
  // Check bottom
  if (row < 4) {
    const bottomIndex = index + 5;
    if (dots[bottomIndex].innerText === connectedDots[0].innerText) {
      connectedDots.push(dots[bottomIndex]);
    }
  }
  
  return connectedDots;
}

// Start timer
function startTimer() {
  const intervalId = setInterval(() => {
    timer--;
    timerDisplay.innerText = timer;
    
    if (timer === 0) {
      clearInterval(intervalId);
      gameOver(false);
    }
  }, 1000);
}

// Show hint
function showHint() {
  const unconnectedDots = dots.filter(dot => !dot.classList.contains("connected"));
  const randomDot = unconnectedDots[Math.floor(Math.random() * unconnectedDots.length)];
  randomDot.classList.add("selected");
  setTimeout(() => {
    randomDot.classList.remove("selected");
  }, 1000);
}

// Game over
function gameOver(isWin) {
  clearInterval(intervalId);
  
  if (isWin) {
    alert("Congratulations! You won!");
  } else {
    alert("Game over! Please try again.");
  }
  
  location.reload();
}

// Initialize game
function initGame() {
  generateGrid();
  startTimer();
}

// Event listeners
hintBtn.addEventListener("click", showHint);

// Start game
initGame();


