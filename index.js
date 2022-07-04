var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 100);

function main() {
  loadingScreen();
}

function loadingScreen() {
  document.getElementById("titleScreen").innerHTML = "<h1>LumberJack</h1>";
  document.getElementById(
    "buttons"
  ).innerHTML = `<i class="bi bi-play-circle-fill" id="play"></i>`;
  document.getElementById("buttons").addEventListener("click", (e) => {
    startGame();
  });
}

function startGame() {
  document.getElementById("buttons").innerHTML = `
        <i class="bi bi-arrow-left-circle-fill" id="left"></i
        ><i class="bi bi-arrow-right-circle-fill" id="right"></i>`;
  document.getElementById("titleScreen").innerHTML = ``;
  document.addEventListener(
    "keydown",
    (e) => {
      onKeyPress(e);
    },
    false
  );
  document.getElementById("buttons").addEventListener(
    "click",
    (e) => {
      onKeyPress(e);
    },
    false
  );
}

function onKeyPress(e) {
  if (e.type !== "click" && e.type !== "keydown") {
    return;
  }
  if (e.type === "keydown") {
    switch (e.key.toLowerCase()) {
      case "a":
      case "arrowleft":
        console.log("left");
        break;
      case "d":
      case "arrowright":
        console.log("right");
        break;
      default:
        return;
    }
    return;
  }
  if (e.target.id !== "buttons") {
    console.log(e.target.id);
    return;
  }
}

var player = (width, height, color, x, y) => {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
};
