function Cell(row, column) {
  this.row = row;
  this.column = column;
  this.visited = false;

  this.top = true;
  this.right = true;
  this.bottom = true;
  this.left = true;

  this.show = function() {
    var x = this.column * gridSize;
    var y = this.row * gridSize;
    stroke(255);

    if (this.top) {
      line(x, y, x + gridSize, y);
    }
    if (this.right) {
      line(x + gridSize, y, x + gridSize, y + gridSize);
    }
    if (this.bottom) {
      line(x + gridSize, y + gridSize, x, y + gridSize);
    }
    if (this.left) {
      line(x, y + gridSize, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(0, 200, 255);
      rect(x, y, gridSize, gridSize);
    }
  }

  this.highlight = function() {
    var x = this.column * gridSize;
    var y = this.row * gridSize;
    noStroke()
    fill(255, 0, 0, 200);
    rect(x, y, gridSize, gridSize);
  }

  this.checkNeighbors = function() {
    var neighbors = [];
    var topNeighbor = cells[index(row - 1, column)];
    var rightNeighbor = cells[index(row, column + 1)];
    var bottomNeighbor = cells[index(row + 1, column)];
    var leftNeighbor = cells[index(row, column - 1)]

    if (topNeighbor && !topNeighbor.visited) {
      neighbors.push(topNeighbor);
    }
    if (rightNeighbor && !rightNeighbor.visited) {
      neighbors.push(rightNeighbor);
    }
    if (bottomNeighbor && !bottomNeighbor.visited) {
      neighbors.push(bottomNeighbor);
    }
    if (leftNeighbor && !leftNeighbor.visited) {
      neighbors.push(leftNeighbor);
    }

    if (neighbors.length > 0) {
      var randomNeighbor = floor(random(0, neighbors.length));
      return neighbors[randomNeighbor];
    } else {
      return undefined;
    }
  }
}
