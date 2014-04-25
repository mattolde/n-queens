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

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var checkBoard = function(board, row){
    for(var col = 0; col < n; col++){
      board.togglePiece(row, col);
      if(!board.hasRowConflictAt(row) && !board.hasColConflictAt(col)){
        if(row === (n - 1)){
          solutionCount++;
        } else {
          checkBoard(board, row + 1);
        }
      }
      board.togglePiece(row, col);
    }
  };

  checkBoard(new Board({n: n}), 0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
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
      if(board.hasRowConflictAt(row) || board.hasColConflictAt(col) || board.hasAnyMinorDiagonalConflicts() || board.hasAnyMajorDiagonalConflicts()){
        // remove the piece
        board.togglePiece(row, col);
      }
    }
  }

  var solution = board.rows();

  // var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  //initialize arrays
  var colArr = [];
  var rightArr = [];
  var leftArr = [];
  for (var i = 0; i < n; i++) {
    colArr.push(0);
    rightArr.push(0);
    leftArr.push(0);
  }

  var checkBoard = function(row, colArr, rightArr, leftArr){
    for(var i = 0; i < n; i++){
      //check each of the 3 arrays
      if(!colArr[i] && !rightArr[i] && !leftArr[i]) {
        // console.log('n', n, 'ROW',row,'COLARR', colArr, 'RIGHT',rightArr, 'LEFT',leftArr);
      //if there is no 1 in the array, than toggle piece
      //check if this is the last row, if yes increment solutionCount
        if (row + 1 === n) {
          solutionCount++;
          return;
        } else {
          //create a copy of the arrays and operate on that
          var copyColArr = colArr.slice();
          var copyRightArr = rightArr.slice();
          var copyLeftArr = leftArr.slice();

          copyColArr[i] = 1;
          copyRightArr[i] = 1;
          copyLeftArr[i] = 1;

        //if not...
        //  shift rightArr right by adding a zero to the beginning and popping off the last value
          copyRightArr.unshift(0);
          copyRightArr.pop();
        //  shift leftArr left by removing the first item and adding a zero to the end
          copyLeftArr.shift();
          copyLeftArr.push(0);
        //  recurse on the new arrangement
          checkBoard(row + 1, copyColArr, copyRightArr, copyLeftArr);
        }
      }
    }
  };

  checkBoard(0, colArr, rightArr, leftArr);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return n === 0 ? 1 : solutionCount; // edit me later?
};
