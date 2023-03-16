// Game elements
const container = document.querySelector(".container");
const scoreDisplay = document.getElementById("score");
const remainingDisplay = document.getElementById("remaining");
const timerDisplay = document.getElementById("timer");
const hintBtn = document.getElementById("hint-btn");

// Game data
let score = 0;
let remainingMatches;
let timer = 30;
let intervalId;
let dots;

// Generate game grid
function generateGrid() {
  const gameDiv = document.querySelector(".game");
  gameDiv.innerHTML = "";
  dots = [];
  
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dot.innerText = getRandomLetter();
    dot.addEventListener("click", selectDot);
    gameDiv.appendChild(dot);
    dots.push(dot);
  }
  
  remainingMatches = 25;
  remainingDisplay.innerText = remainingMatches;
}

// Get random letter
function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    remainingMatches -= connectedDots.length;
    remainingDisplay.innerText = remainingMatches;
  }
  
  // Check if game is over
  if (remainingMatches === 0) {
    levelUp();
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
    const leftDot = dots[leftIndex];
    if (leftDot.innerText === connectedDots[0].innerText) {
      connectedDots.push(leftDot);
    }
  }
  
  // Check right
  if (col < 4) {
    const rightIndex = index + 1;
    const rightDot = dots[rightIndex];
    if (rightDot.innerText === connectedDots[0].innerText) {
      connectedDots.push(rightDot);
    }
  }
  
  // Check top
  if (row > 0) {
    const topIndex = index - 5;
    const topDot = dots[topIndex];
    if (topDot.innerText === connectedDots[0].innerText) {
      connectedDots.push(topDot);
    }
  }
  
  // Check bottom
  if (row < 4) {
    const bottomIndex = index + 5;
    const bottomDot = dots[bottomIndex];
    if (bottomDot.innerText === connectedDots[0].innerText) {
      connectedDots.push(bottomDot);
    }
  }
  
  return connectedDots;
}
// Start timer
function startTimer() {
  intervalId = setInterval(() => {
    timer--;
    timerDisplay.innerText = timer;
    if (timer === 0) {
      clearInterval(intervalId);
      gameOver(false);
    }
  }, 1000);
}

// Game over
function gameOver(win) {
  clearInterval(intervalId);
  if (win) {
    alert(`You won with a score of ${score}!`);
  } else {
    alert(`Time's up! You scored ${score}.`);
  }
  initGame();
}

// Level up
function levelUp() {
  score += timer;
  scoreDisplay.innerText = score;
  timer += 5;
  timerDisplay.innerText = timer;
  dots.forEach(dot => {
    dot.classList.remove("connected");
  });
  generateGrid();
}

// Show hint
hintBtn.addEventListener("click", () => {
  const unconnectedDots = dots.filter(dot => !dot.classList.contains("connected"));
  if (unconnectedDots.length > 0) {
    const randomIndex = Math.floor(Math.random() * unconnectedDots.length);
    const randomDot = unconnectedDots[randomIndex];
    randomDot.classList.add("hint");
    setTimeout(() => {
      randomDot.classList.remove("hint");
    }, 1000);
  }
});

// Initialize game
function initGame() {
  score = 0;
  scoreDisplay.innerText = score;
  timer = 30;
  timerDisplay.innerText = timer;
  generateGrid();
  startTimer();
}

initGame();

