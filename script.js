const gameBoard = document.getElementById("gameBoard");
const gameMenu = document.getElementById("gameMenu");
let X_pattern = [];
let O_pattern = [];
const winnerMark = document.getElementById("winner-mark");
let turn = document.getElementById("turn");
let allBox = document.getElementsByClassName("box");
const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");
const cpuBtn = document.getElementById("cpuBtn");
const playerBtn = document.getElementById("playerBtn");
const XradioBtn = document.getElementById("X-mark");
const OradioBtn = document.getElementById("O-mark");
const cpuThinkMessage = document.getElementById("cpuThink");
let winnerX = false;
let winnerO = false;
const box0 = document.getElementById("0");
const box1 = document.getElementById("1");
const box2 = document.getElementById("2");
const box3 = document.getElementById("3");
const box4 = document.getElementById("4");
const box5 = document.getElementById("5");
const box6 = document.getElementById("6");
const box7 = document.getElementById("7");
const box8 = document.getElementById("8");

let origBoard = Array.from(Array(9).keys());
let huPlayer;
let aiPlayer;

const win_pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function newGameCPU() {
  gameBoard.style.display = "initial";
  gameMenu.style.display = "none";
  if (XradioBtn.checked === true) {
    huPlayer = "X";
    aiPlayer = "O";
    player1Name.innerHTML = "X (You)";
    player2Name.innerHTML = "0 (CPU)";
  } else {
    huPlayer = "O";
    aiPlayer = "X";
    player1Name.innerHTML = "X (CPU)";
    player2Name.innerHTML = "0 (You)";
  }
  cpuBtn.setAttribute("data-value", "active");
  playerBtn.setAttribute("data-value", "");

  cpuTurn();
}

function newGamePlayer() {
  gameBoard.style.display = "initial";
  gameMenu.style.display = "none";
  player1Name.innerHTML = "X (P1)";
  player2Name.innerHTML = "0 (P2)";
  playerBtn.setAttribute("data-value", "active");
  cpuBtn.setAttribute("data-value", "");
}

function restartGame() {
  window.location.reload();
}

function hitBox(box) {
  let boxChoice = document.getElementById(box);
  let img = document.createElement("img");

  if (turn.getAttribute("data-value") === "X") {
    img.src = "./assets/icon-x.svg";
    img.setAttribute("class", "boxPlayed");
    boxChoice.appendChild(img);
    boxChoice.classList.remove("hoverClassX");
    boxChoice.setAttribute("data-value", "X");
    boxChoice.setAttribute("onclick", "");
    turn.setAttribute("data-value", "O");
    turn.src = "./assets/icon-o-turn.svg";
    X_pattern.push(parseInt(boxChoice.id, 10));
    X_pattern.sort();
    if (XradioBtn.checked === true) {
      origBoard.splice(
        parseInt(boxChoice.id, 10),
        1,
        (parseInt(boxChoice.id, 10), huPlayer)
      );
    } else {
      origBoard.splice(
        parseInt(boxChoice.id, 10),
        1,
        (parseInt(boxChoice.id, 10), aiPlayer)
      );
    }
    for (empty of allBox) {
      if (empty.getAttribute("data-value") === "") {
        empty.classList.add("hoverClassO");
        empty.classList.remove("hoverClassX");
      }
    }
    checkWin(X_pattern);
  } else {
    img.src = "./assets/icon-o.svg";
    img.setAttribute("class", "boxPlayed");
    boxChoice.appendChild(img);
    boxChoice.classList.remove("hoverClassO");
    boxChoice.setAttribute("data-value", "O");
    boxChoice.setAttribute("onclick", "");
    turn.setAttribute("data-value", "X");
    turn.src = "./assets/icon-x-turn.svg";
    O_pattern.push(parseInt(boxChoice.id, 10));
    O_pattern.sort();
    if (OradioBtn.checked === true) {
      origBoard.splice(
        parseInt(boxChoice.id, 10),
        1,
        (parseInt(boxChoice.id, 10), huPlayer)
      );
    } else {
      origBoard.splice(
        parseInt(boxChoice.id, 10),
        1,
        (parseInt(boxChoice.id, 10), aiPlayer)
      );
    }
    for (empty of allBox) {
      if (empty.getAttribute("data-value") === "") {
        empty.classList.add("hoverClassX");
        empty.classList.remove("hoverClassO");
      }
    }
    checkWin(O_pattern);
  }

  if (cpuBtn.getAttribute("data-value") === "active") {
    cpuTurn();
  }
}

var isThereWinner = false;

function checkWin(currentPlayer) {
  for (some of win_pattern) {
    const isContainedIn = (a, b) => {
      for (const v of new Set(a)) {
        if (!b.some((e) => e === v)) return false;
      }
      for (empty of allBox) {
        if (empty.getAttribute("data-value") === "") {
          empty.classList.remove("hoverClassX");
          empty.classList.remove("hoverClassO");
          empty.setAttribute("onclick", "");
        }
      }
      isThereWinner = true;
      results();
      return true;
    };
    isContainedIn(some, currentPlayer);
  }

  if (
    isThereWinner === false &&
    X_pattern.length === 5 &&
    O_pattern.length === 4
  ) {
    for (all of allBox) {
      all.classList.remove("hoverClassO");
      all.classList.remove("hoverClassX");
      all.setAttribute("onclick", "");
    }
    draw();
  }
}

async function cpuTurn() {
  if (XradioBtn.checked === true) {
    const promise = new Promise((resolve, reject) => {
      if (turn.getAttribute("data-value") === "O") {
        box0.setAttribute("onclick", "");
        box1.setAttribute("onclick", "");
        box2.setAttribute("onclick", "");
        box3.setAttribute("onclick", "");
        box4.setAttribute("onclick", "");
        box5.setAttribute("onclick", "");
        box6.setAttribute("onclick", "");
        box7.setAttribute("onclick", "");
        box8.setAttribute("onclick", "");
        resolve();
      }
      if (winnerX === true) {
        reject();
      }
    });
    await promise;
    setTimeout(cpuPlay, 2000);
    cpuThink();
  }

  if (OradioBtn.checked === true) {
    const promise = new Promise((resolve) => {
      if (turn.getAttribute("data-value") === "X") {
        box0.setAttribute("onclick", "");
        box1.setAttribute("onclick", "");
        box2.setAttribute("onclick", "");
        box3.setAttribute("onclick", "");
        box4.setAttribute("onclick", "");
        box5.setAttribute("onclick", "");
        box6.setAttribute("onclick", "");
        box7.setAttribute("onclick", "");
        box8.setAttribute("onclick", "");
        resolve();
      }
      if (winnerO === true) {
        reject();
      }
    });
    await promise;
    setTimeout(cpuPlay, 2000);
    cpuThink();
  }
}

function printLetterByLetter(destination, message, speed) {
  var i = 0;
  var interval = setInterval(function () {
    document.getElementById(destination).innerHTML += message.charAt(i);
    i++;
    if (i > message.length) {
      clearInterval(interval);
    }
  }, speed);
  document.getElementById(destination).innerHTML = "";
}

function cpuThink() {
  cpuThinkMessage.style.display = "initial";
  printLetterByLetter("cpuThinkMessage", "CPU think...", 150);
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function cpuPlay() {
  cpuThinkMessage.style.display = "none";
  hitBox(bestSpot());

  // console.log(origBoard);
  // console.log(minimax(origBoard, aiPlayer).index);

  box0.setAttribute("onclick", "hitBox('0')");
  box1.setAttribute("onclick", "hitBox('1')");
  box2.setAttribute("onclick", "hitBox('2')");
  box3.setAttribute("onclick", "hitBox('3')");
  box4.setAttribute("onclick", "hitBox('4')");
  box5.setAttribute("onclick", "hitBox('5')");
  box6.setAttribute("onclick", "hitBox('6')");
  box7.setAttribute("onclick", "hitBox('7')");
  box8.setAttribute("onclick", "hitBox('8')");
}

//      Modal      //

const modal = document.getElementById("modal");
const endGame = document.getElementById("endGameModal");
const restartingGame = document.getElementById("restartGame");
const winnerTakes = document.getElementById("winnerTakes");
const winnerName = document.getElementById("winnerName");
const Xscore = document.getElementById("Xscore");
const drawScore = document.getElementById("draw");
const Oscore = document.getElementById("Oscore");

function results() {
  setTimeout(function () {
    modal.style.display = "initial";
    endGame.style.display = "flex";
    restartingGame.style.display = "none";
  }, 1500);
  

  if (turn.getAttribute("data-value") === "O") {
    winnerName.style.display = "initial";

    if (playerBtn.getAttribute("data-value") === "active") {
      if (XradioBtn.checked === true) {
        changeXBackground();
        winnerName.innerHTML = "Player 1 wins!";
      }
      if (OradioBtn.checked === true) {
        changeXBackground();
        winnerName.innerHTML = "Player 1 wins!";
      }
    }
    if (cpuBtn.getAttribute("data-value") === "active") {
      if (XradioBtn.checked === true) {
        changeOBackground();
        winnerName.innerHTML = "You won!";
      }
      if (OradioBtn.checked === true) {
        changeXBackground();
        winnerName.innerHTML = "Oh no, you lost...";
      }
    }

    winnerMark.src = "./assets/icon-x.svg";
    winnerMark.style.display = "initial";
    winnerMark.style.width = "50px";
    winnerMark.style.height = "50px";
    winnerTakes.style = "color: hsl( var(--clr-lightBlue) );";
    winnerTakes.innerHTML = "takes the round";
    Xscore.innerHTML++;
    winnerX = true;
  } else {
    winnerName.style.display = "initial";
    if (playerBtn.getAttribute("data-value") === "active") {
      if (OradioBtn.checked === true) {
        changeOBackground();
        winnerName.innerHTML = "Player 2 wins!";
      }
      if (XradioBtn.checked === true) {
        changeOBackground();
        winnerName.innerHTML = "Player 2 wins!";
      }
    }
    if (cpuBtn.getAttribute("data-value") === "active") {
      if (OradioBtn.checked === true) {
        changeOBackground();
        winnerName.innerHTML = "You won!";
      }
      if (XradioBtn.checked === true) {
        changeOBackground();
        winnerName.innerHTML = "Oh no, you lost...";
      }
    }

    winnerMark.src = "./assets/icon-o.svg";
    winnerMark.style.display = "initial";
    winnerMark.style.width = "50px";
    winnerMark.style.height = "50px";
    winnerTakes.style = "color: hsl( var(--clr-orange) );";
    winnerTakes.innerHTML = "takes the round";
    Oscore.innerHTML++;
    winnerO = true;
  }
}



function draw() {
  setTimeout(function(){
    modal.style.display = "initial";
    endGame.style.display = "flex";
    restartingGame.style.display = "none";
    winnerMark.style.display = "none";
    winnerTakes.innerHTML = "round tied";
    winnerTakes.style = "color: hsl( var(--clr-silver) );";
    winnerName.style.display = "none";
    drawScore.innerHTML++;
  }, 1500);
}

function nextRound() {
  let boxPlayed = document.querySelectorAll(".boxPlayed");
  removeXBackgroundColor();
  removeOBackgroundColor();

  modal.style.display = "none";
  endGame.style.display = "none";
  restartingGame.style.display = "none";
  for (all of boxPlayed) {
    all.parentNode.removeChild(all);
  }

  for (all of allBox) {
    all.setAttribute("data-value", "");
    all.classList.add("hoverClassX");
  }

  turn.setAttribute("data-value", "X");
  turn.src = "./assets/icon-x-turn.svg";
  box0.setAttribute("onclick", "hitBox('0')");
  box1.setAttribute("onclick", "hitBox('1')");
  box2.setAttribute("onclick", "hitBox('2')");
  box3.setAttribute("onclick", "hitBox('3')");
  box4.setAttribute("onclick", "hitBox('4')");
  box5.setAttribute("onclick", "hitBox('5')");
  box6.setAttribute("onclick", "hitBox('6')");
  box7.setAttribute("onclick", "hitBox('7')");
  box8.setAttribute("onclick", "hitBox('8')");
  X_pattern = [];
  O_pattern = [];
  origBoard = Array.from(Array(9).keys());
}

function displayModalRestart() {
  modal.style.display = "initial";
  endGame.style.display = "none";
  restartingGame.style.display = "flex";
}

function cancelReset() {
  modal.style.display = "none";
  checkWin(O_pattern);
  checkWin(X_pattern);
}

//    MiniMax    //

function emptySquares() {
  return origBoard.filter((s) => typeof s == "number");
}

function checkWinner(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of win_pattern.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares();

  if (checkWinner(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWinner(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function changeXBackground() {
  if (String(X_pattern) === '0,1,2') {
    box0.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box1.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box2.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    let img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-x-1.png';
    img[1].src = './assets/icon-x-1.png';
    img[2].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '3,4,5') {
    box3.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box4.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box5.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    img[2].src = './assets/icon-x-1.png';
    img[3].src = './assets/icon-x-1.png';
    img[4].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '6,7,8') {
    box6.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box7.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box8.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    img[2].src = './assets/icon-x-1.png';
    img[3].src = './assets/icon-x-1.png';
    img[4].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '0,3,6') {
    box0.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box3.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box6.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-x-1.png';
    img[1].src = './assets/icon-x-1.png';
    img[3].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '1,4,7') {
    box1.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box4.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box7.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-x-1.png';
    img[2].src = './assets/icon-x-1.png';
    img[4].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '2,5,8') {
    box2.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box5.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box8.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-x-1.png';
    img[2].src = './assets/icon-x-1.png';
    img[4].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '0,4,8') {
    box0.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box4.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box8.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    console.log(img);
    img[0].src = './assets/icon-x-1.png';
    img[2].src = './assets/icon-x-1.png';
    img[4].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '2,4,6') {
    box2.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box4.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    box6.style.backgroundColor = 'hsl(var(--clr-lightBlue))';
    img = document.getElementsByClassName('boxPlayed');
    img[1].src = './assets/icon-x-1.png';
    img[3].src = './assets/icon-x-1.png';
    img[4].src = './assets/icon-x-1.png';
  } else if (String(X_pattern) === '1,4,6,7') {
    box1.style.backgroundColor = '#F2B137';
    box4.style.backgroundColor = '#F2B137';
    box7.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-o-1.png';
    img[1].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
  }
}

function changeOBackground() {
  if (String(O_pattern) === '0,1,2') {
    box0.style.backgroundColor = '#F2B137';
    box1.style.backgroundColor = '#F2B137';
    box2.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-o-1.png';
    img[1].src = './assets/icon-o-1.png';
    img[2].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '3,4,5') {
    box3.style.backgroundColor = '#F2B137';
    box4.style.backgroundColor = '#F2B137';
    box5.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[2].src = './assets/icon-o-1.png';
    img[3].src = './assets/icon-o-1.png';
    img[4].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '6,7,8') {
    box6.style.backgroundColor = '#F2B137';
    box7.style.backgroundColor = '#F2B137';
    box8.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[3].src = './assets/icon-o-1.png';
    img[4].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '0,3,6') {
    box0.style.backgroundColor = '#F2B137';
    box3.style.backgroundColor = '#F2B137';
    box6.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-o-1.png';
    img[1].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '1,4,7') {
    box1.style.backgroundColor = '#F2B137';
    box4.style.backgroundColor = '#F2B137';
    box7.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[1].src = './assets/icon-o-1.png';
    img[3].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '2,5,8') {
    box2.style.backgroundColor = '#F2B137';
    box5.style.backgroundColor = '#F2B137';
    box8.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    console.log(img);
    img[1].src = './assets/icon-o-1.png';
    img[4].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '0,4,8') {
    box0.style.backgroundColor = '#F2B137';
    box4.style.backgroundColor = '#F2B137';
    box8.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[0].src = './assets/icon-o-1.png';
    img[3].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
  } else if (String(O_pattern) === '2,4,6') {
    box2.style.backgroundColor = '#F2B137';
    box4.style.backgroundColor = '#F2B137';
    box6.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    console.log(img);
    img[2].src = './assets/icon-o-1.png';
    img[4].src = './assets/icon-o-1.png';
    img[5].src = './assets/icon-o-1.png';
} else if (String(O_pattern) === '1,4,6,7') {
    box1.style.backgroundColor = '#F2B137';
    box4.style.backgroundColor = '#F2B137';
    box7.style.backgroundColor = '#F2B137';
    let img = document.getElementsByClassName('boxPlayed');
    img[1].src = './assets/icon-o-1.png';
    img[4].src = './assets/icon-o-1.png';
    img[7].src = './assets/icon-o-1.png';
}
}

function removeXBackgroundColor() {
  if (String(X_pattern) === '0,1,2') {
    document.getElementById('0').style.removeProperty('background-color');
    document.getElementById('1').style.removeProperty('background-color');
    document.getElementById('2').style.removeProperty('background-color');
  } else if (String(X_pattern) === '3,4,5') {
    document.getElementById('3').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('5').style.removeProperty('background-color');
  } else if (String(X_pattern) === '6,7,8') {
    document.getElementById('6').style.removeProperty('background-color');
    document.getElementById('7').style.removeProperty('background-color');
    document.getElementById('8').style.removeProperty('background-color');
  } else if (String(X_pattern) === '0,3,6') {
    document.getElementById('0').style.removeProperty('background-color');
    document.getElementById('3').style.removeProperty('background-color');
    document.getElementById('6').style.removeProperty('background-color');
  } else if (String(X_pattern) === '1,4,7') {
    document.getElementById('1').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('7').style.removeProperty('background-color');
  } else if (String(X_pattern) === '2,5,8') {
    document.getElementById('2').style.removeProperty('background-color');
    document.getElementById('5').style.removeProperty('background-color');
    document.getElementById('8').style.removeProperty('background-color');
  } else if (String(X_pattern) === '0,4,8') {
    document.getElementById('0').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('8').style.removeProperty('background-color');
  } else if (String(X_pattern) === '2,4,6') {
    document.getElementById('2').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('6').style.removeProperty('background-color');
  } else if (String(X_pattern) === '1,4,6,7') {
    document.getElementById('1').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('7').style.removeProperty('background-color');
  }
}

function removeOBackgroundColor() {
  if (String(O_pattern) === '0,1,2') {
    document.getElementById('0').style.removeProperty('background-color');
    document.getElementById('1').style.removeProperty('background-color');
    document.getElementById('2').style.removeProperty('background-color');
  } else if (String(O_pattern) === '3,4,5') {
    document.getElementById('3').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('5').style.removeProperty('background-color');
  } else if (String(O_pattern) === '6,7,8') {
    document.getElementById('6').style.removeProperty('background-color');
    document.getElementById('7').style.removeProperty('background-color');
    document.getElementById('8').style.removeProperty('background-color');
  } else if (String(O_pattern) === '0,3,6') {
    document.getElementById('0').style.removeProperty('background-color');
    document.getElementById('3').style.removeProperty('background-color');
    document.getElementById('6').style.removeProperty('background-color');
  } else if (String(O_pattern) === '1,4,7') {
    document.getElementById('1').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('7').style.removeProperty('background-color');
  } else if (String(O_pattern) === '2,5,8') {
    document.getElementById('2').style.removeProperty('background-color');
    document.getElementById('5').style.removeProperty('background-color');
    document.getElementById('8').style.removeProperty('background-color');
  } else if (String(O_pattern) === '0,4,8') {
    document.getElementById('0').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('8').style.removeProperty('background-color');
  } else if (String(O_pattern) === '2,4,6') {
    document.getElementById('2').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('6').style.removeProperty('background-color');
  } else if (String(O_pattern) === '1,4,6,7') {
    document.getElementById('1').style.removeProperty('background-color');
    document.getElementById('4').style.removeProperty('background-color');
    document.getElementById('7').style.removeProperty('background-color');
  }

}