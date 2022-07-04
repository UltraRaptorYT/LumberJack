var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

var character = {
  width: 20,
  height: 10,
};

var Pos = {
  0: { x: (canvas.width - 60 - character["width"]) / 2 - 10, y: 100 },
  1: { x: (canvas.width + 20 + character["width"]) / 2 + 10, y: 100 },
};

class Tree {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = () => {
      ctx.save();
      ctx.fillStyle = "#964B00";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    };
  }
}

class Branch {
  constructor(x, y, width, height, color = "#964B00") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.update = () => {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    };
  }
}

class Player {
  constructor(x, y, width, height, startPos) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pos = startPos;
    this.level = 0;
    this.update = () => {
      ctx.save();
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      var tree = new Tree((canvas.width - 20) / 2, -35, 20, canvas.height);
      tree.update();
      ctx.restore();
    };
    this.newPos = () => {
      this.pos = Number(!this.pos);
      this.x = Pos[this.pos].x;
      this.y = Pos[this.pos].y;
    };
  }
}

function popArr(length) {
  var branchDict = {
    0: new Array(length),
    1: new Array(length),
  };
  for (var i = 0; i < 2; i++) {
    branchDict[0][i] = 0;
    branchDict[1][i] = 0;
  }
  for (var i = 2; i < length; i++) {
    var branchSide = Math.round(Math.random());
    branchDict[branchSide][i] = 1;
    branchDict[Number(!branchSide)][i] = 0;
  }
  return branchDict;
}

function updateBranch(branchDict) {
  var branchSide = Math.round(Math.random());
  branchDict[0].shift();
  branchDict[1].shift();
  branchDict[branchSide].push(1);
  branchDict[Number(!branchSide)].push(0);
  console.log(branchDict);
}

function startGame() {
  document.getElementById("buttons").innerHTML = `
        <i class="bi bi-arrow-left-circle-fill" id="left"></i
        ><i class="bi bi-arrow-right-circle-fill" id="right"></i>`;
  document.getElementById("titleScreen").innerHTML = ``;
  var startPos = Math.round(Math.random());
  var arrayLength = 10;
  branchDict = popArr(arrayLength);
  for (var i = 0; i < arrayLength; i++) {
    var branchDirection;
    if (branchDict[1][i] == 1) {
      var branchDirection = 1;
    }
    if (branchDict[0][i] == 1) {
      var branchDirection = 0;
    }
    if (branchDirection != undefined) {
      var length = 50 + Math.floor(Math.random() * 20) * 2;
      var length = 50;
      var branch = new Branch(
        canvas.width / 2 + 10 - (length + 20) * Number(!branchDirection),
        i * -30 + 110,
        length,
        5
      );
      branch.update();
    }
  }
  var player = new Player(
    Pos[startPos].x,
    Pos[startPos].y,
    20,
    10,
    startPos,
    branchDict
  );
  player.update();
  duringGame(player, branchDict);
  console.log(branchDict);
}

function updatePosition(direction, player, branchDict) {
  if (direction == "left") direction = 0;
  else direction = 1;
  player.level++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(branchDict);
  for (var i = 0; i < branchDict[0].length; i++) {
    if (branchDict[1][i] == 1) {
      var branchDirection = 1;
    }
    if (branchDict[0][i] == 1) {
      var branchDirection = 0;
    }
    if (branchDirection != undefined) {
      // var length = 50 + Math.floor(Math.random() * 20) * 2;
      var length = 50;
      var branch = new Branch(
        canvas.width / 2 + 10 - (length + 20) * Number(!branchDirection),
        i * -30 + 110 + 15 * Math.floor(player.level % 2),
        length,
        5,
        "#00ff00"
      );
      branch.update();
    }
  }
  if (player.pos != direction) {
    player.newPos();
  }
  player.update();
  console.log(direction, Math.floor(player.level % 2));
  if (Math.floor(player.level % 2) == 1) updateBranch(branchDict);
  if (branchDict[direction][Math.floor(player.level % 2)] == 1) {
    console.log("dye");
  }
}

function duringGame(player, branchDict) {
  document.addEventListener(
    "keydown",
    (e) => {
      onKeyPress(e, player, branchDict);
    },
    false
  );
  document.getElementById("buttons").addEventListener(
    "click",
    (e) => {
      onKeyPress(e, player, branchDict);
    },
    false
  );
}

function onKeyPress(e, player, branchDict) {
  if (e.type !== "click" && e.type !== "keydown") {
    return;
  }
  if (e.type === "keydown") {
    switch (e.key.toLowerCase()) {
      case "a":
      case "arrowleft":
        var direction = "left";
        return updatePosition(direction, player, branchDict);
      case "d":
      case "arrowright":
        var direction = "right";
        return updatePosition(direction, player, branchDict);
      default:
        return;
    }
  }
  if (e.target.id !== "buttons") {
    var direction = e.target.id;
    return updatePosition(direction, player, branchDict);
  }
}
