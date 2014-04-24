/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  // var makeEmptyMatrix
  var board = new Board({n: n});
  var rows = board.rows();

  // interate through rows
  for(var row = 0; row < rows.length; row++){
    // interate through cols
    for(var col = 0; col < rows.length; col++){
      // place piece at row col index
      board.togglePiece(row, col);
      // if row or col conflict
      if(board.hasRowConflictAt(row) || board.hasColConflictAt(col)){
        // remove the piece
        board.togglePiece(row, col);
      }
    }
  }

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var partial = [new Board({n: n})];

  var checkBoard = function(rowIndex, board){
    //loop through the row at rowIndex of the board
    var tempArr = [];
    for(var col = 0; col < n; col++){
      //toggle position at colindex
      board.togglePiece(rowIndex, col);
      //check for row and col conflicts
      if(!board.hasRowConflictAt(rowIndex) && !board.hasColConflictAt(col)){
        //  if no conflicts, put copy to partial
        console.log('possible solution!');
        tempArr.push(board);
      }
      //toggle off
      board.togglePiece(rowIndex, col);
    }

    return tempArr;
  };

  for(var i = 0; i < n; i++){
    // iterate through all partials, checkBoard on row of n
    var nextPartial = [];
    for(var k = 0; k < partial.length; k++){
      nextPartial = nextPartial.concat(checkBoard(i, partial[k]));
    }
    partial = nextPartial;
  }

  for(var t = 0; t < partial.length; t++){
    console.log("MATRIX ", partial[t].rows());
  }

  solutionCount = partial.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
