var isShuffled = 0;
document.addEventListener("DOMContentLoaded", function () {
    var tiles = Array.from(document.querySelectorAll('.tile')); 
    tiles.forEach(function (tile) {
        var number = tile.getAttribute('data-number');
        var backgroundPositionX = ((number - 1) % 4) * -100; // Adjust based on the number
        var backgroundPositionY = Math.floor((number - 1) / 4) * -100; // Adjust based on the number
        tile.style.backgroundImage = 'url("luigi.jpg")';
        tile.style.backgroundPosition = backgroundPositionX + 'px ' + backgroundPositionY + 'px';
    });
    
    ArrangePuzzle(tiles);

    var shuffleButton = document.getElementById("shuffleButton");
    shuffleButton.addEventListener("click", function () {
        ShuffleTiles(tiles);
        displayPuzzle(tiles);
        updateTilePositions(tiles);
    });

});

function ArrangePuzzle(tiles) {
    tiles.forEach(function (tile) {
        tile.addEventListener("click", function() {
          //  tileClickHandler(tile, tiles);
            swapTile(tile, tiles);
            if(isPuzzleSolved(tiles) && isShuffled == 1){
                console.log("isShuffled "+isShuffled);
                alert("Puzzle Solved!!");
                isShuffled = 0;
            }
        });
        tile.addEventListener("mouseover", function () {
            if (isMoveable(tile, tiles)) {
                tile.classList.add('moveable');
            }
        });

        tile.addEventListener("mouseout", function () {
            tile.classList.remove('moveable');
        });
    });
}

function ShuffleTiles(tiles) {
    var iterations = 500; // Adjust the number of iterations as needed
    for (let i = 0; i < iterations; i++) {
        var emptyTileIndex = tiles.findIndex(tile => tile.getAttribute('data-number') === "0");
        var neighbors = getAdjacentTiles(emptyTileIndex);
        var randomNeighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)];

        [tiles[emptyTileIndex], tiles[randomNeighborIndex]] = [tiles[randomNeighborIndex], tiles[emptyTileIndex]];
    }
    isShuffled = 1;
}

function getAdjacentTiles(emptyTileIndex) {
    var row = Math.floor(emptyTileIndex / 4);
    var col = emptyTileIndex % 4;
    var neighbors = [];

    if (row > 0) neighbors.push(emptyTileIndex - 4); // Top neighbor
    if (row < 3) neighbors.push(emptyTileIndex + 4); // Bottom neighbor
    if (col > 0) neighbors.push(emptyTileIndex - 1); // Left neighbor
    if (col < 3) neighbors.push(emptyTileIndex + 1); // Right neighbor

    return neighbors;
}

function tileClickHandler(tile, tiles) {
    var index = tiles.indexOf(tile);
    var row = Math.floor(index / 4) + 1;
    var col = index % 4 + 1;
    var tileNum = tile.getAttribute('data-number');
    alert("Clicked tile " + tileNum + " position - Row: " + row + ", Column: " + col);
}

function swapTile(clickedTile, tiles) {
    var clickedIndex = tiles.indexOf(clickedTile);
    var clickedRow = Math.floor(clickedIndex / 4) + 1;
    var clickedCol = clickedIndex % 4 + 1;

    var emptyIndex = tiles.indexOf(getEmptyTile(tiles));
    var emptyRow = Math.floor(emptyIndex / 4) + 1;
    var emptyCol = emptyIndex % 4 + 1;

    if (isAdjacent(clickedRow, clickedCol, emptyRow, emptyCol)) {
        [tiles[clickedIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[clickedIndex]];
        displayPuzzle(tiles);
        updateTilePositions(tiles);
    }
}

function isMoveable(hoveredTile, tiles){
    var hoveredIndex = tiles.indexOf(hoveredTile);
    var hoveredRow = Math.floor(hoveredIndex / 4) + 1;
    var hoveredCol = hoveredIndex % 4 + 1;

    var emptyIndex = tiles.indexOf(getEmptyTile(tiles));
    var emptyRow = Math.floor(emptyIndex / 4) + 1;
    var emptyCol = emptyIndex % 4 + 1;

    if (isAdjacent(hoveredRow, hoveredCol, emptyRow, emptyCol)){
        return true;
    }

}

function getEmptyTile(tiles) {
    return tiles.find(tile => tile.getAttribute('data-number') === "0");
}

function isAdjacent(row1, col1, row2, col2) {
    return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
}

function displayPuzzle(tiles) {
    var puzzleArea = document.getElementById("puzzlearea");
    puzzleArea.innerHTML = ""; // Clear the existing tiles
    tiles.forEach(tile => {
      puzzleArea.appendChild(tile);
    });
}

function updateTilePositions(tiles) {
    tiles.forEach(function (tile, index) {
      var row = Math.floor(index / 4) + 1;
      var col = index % 4 + 1;
      console.log("Tile "+tile.getAttribute('data-number')+" at Row: " + row + ", Column: " + col + " after shuffling");
    });
    console.log("Eyy");
  }

function isPuzzleSolved(tiles) {
    console.log("IspuzzleSolved?");
    for (var i = 0; i < tiles.length; i++) {
        var tileNum = tiles[i].getAttribute('data-number');
        console.log("Tile "+tileNum+" at Index: " +(i+1));
        if (tileNum === "0") {
            continue; 
        }

        if (tileNum != (i + 1)) {
            console.log("Tile "+tileNum+" at Index: " +(i+1));
            return false; // Puzzle is not solved
        }
    }
    console.log('true');
    return true; // Puzzle is solved
}
