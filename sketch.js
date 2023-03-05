var columns;
var rows;
var gridSize = 40;
var cells = [];
var stack = [];

var currentCell;

function setup() {
  createCanvas(1200, 1200);

  columns = floor(width / gridSize);
  rows = floor(height / gridSize);

  for (var i = 0; i < rows; i += 1) {
    for (var j = 0; j < columns; j += 1) {
      var cell = new Cell(i, j);
      cells.push(cell);
    }
  }

  currentCell = cells[0];
}

function draw() {
  background(51);
  for (var i = 0; i < cells.length; i += 1) {
    cells[i].show();
  }
  currentCell.visited = true;
  var nextCell = currentCell.checkNeighbors();

  if (nextCell) {
    currentCell.highlight();
    nextCell.visited = true;
    stack.push(currentCell);
    removeWalls(currentCell, nextCell);
    currentCell = nextCell;
  } else if (stack.length > 0) {
    currentCell.highlight();
    currentCell = stack.pop();
  }
}

function index(row, column) {
  if (column < 0 || row < 0 || column > columns - 1 || row > rows - 1) {
    return -1;
  }
  return column + row * columns;
}

function removeWalls(currentCell, nextCell) {
  var x = currentCell.column - nextCell.column;
  if (x == 1) {
    currentCell.left = false;
    nextCell.right = false;
  } else if (x == -1) {
    currentCell.right = false;
    nextCell.left = false;
  }

  var y = currentCell.row - nextCell.row;
  if (y == 1) {
    currentCell.top = false;
    nextCell.bottom = false;
  } else if (y == -1) {
    currentCell.bottom = false;
    nextCell.top = false;
  }
}
