// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //keep count of pieces in the row
      var row = this.rows()[rowIndex];
      var count = 0;
      //iterate through the row array and increment count when there is a piece
      for(var i = 0; i < row.length; i++){
        //if count === 2 then return true
        if(row[i] === 1){
          count++;
          if(count === 2){
            return true;
          }
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();

      //loop through all rows
      for (var i = 0; i < rows.length; i++) {
        //use hasRowConflictAt to check it there is a conflict
        if (this.hasRowConflictAt(i)) {
          //if there is any conflict, return true
          return true;
        }
      }

      //else return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //keep count
      var count = 0;
      var rows = this.rows();
      //loop through each row
      for (var i = 0; i < rows.length; i++) {
      //check at row index of colIndex
        if(rows[i][colIndex]) {
        //if there is a 1 increment count
          count++;
          //if count is 2 return true
          if(count === 2) {
            return true;
          }
        }
      }
      //else return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get first row
      var colCount = this.rows()[0].length;
      // interate row indexes
      for(var i = 0; i < colCount; i++){
      // check hasColConflictAt if col index has conflict
        if(this.hasColConflictAt(i)){
          // return if conflict
          return true;
        }
      }
      // false if no conflict
      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowIndex, colIndex) {
      // keep count of items
      var count = 0;
      // column counter
      // get n as length of rows
      var rows = this.rows();
      // loop through rows starting row index
      //
      var majorRowIndex = 0;
      var majorColIndex = 0;

      if(rowIndex > colIndex){
        majorRowIndex = rowIndex - colIndex;
        majorColIndex = 0;
      } else {
        majorRowIndex = 0;
        majorColIndex = colIndex - rowIndex;
      }

      for (var row = majorRowIndex; row < rows.length; row++) {
        // start at col index
        // check current position row & col index
        if (rows[row][majorColIndex]) {
        // if piece increment count
          count++;
          //  if count is 2 return true
          if (count === 2) {
            return true;
          //  else if column is 'n'-1 return false
          } else if (majorColIndex === rows.length - 1) {
            return false;
          }
        }
        // column count + 1
        majorColIndex++;
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //start at 0,0
      var n = this.rows().length;
      // loop through rows
      for (var row = 0; row < (n - 1); row++) {
        // if on first row
        if (row === 0) {
          // loop through columns - 1
          for (var col = 1; col < (n - 1); col++) {
            if (this.hasMajorDiagonalConflictAt(row, col)) {
              return true;
            }
          }
        }
        // check row index and col index 0
        if (this.hasMajorDiagonalConflictAt(row, 0)) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIndex, colIndex) {
      // keep count of items
      var count = 0;
      // column counter
      // get n as length of rows
      var rows = this.rows();
      // loop through rows starting row index

      var minorRowIndex = 0;
      var minorColIndex = rows.length;
      var distanceRight = (rows.length - 1) - colIndex;//temp

      if(rowIndex > distanceRight) {
        minorRowIndex = rowIndex - distanceRight;
        minorColIndex = rows.length - 1;
      } else {
        minorRowIndex = 0;
        minorColIndex = colIndex + rowIndex;
      }
      for (var row = minorRowIndex; row < rows.length; row++) {
        // start at col index
        // check current position row & col index
        if (rows[row][minorColIndex]) {
        // if piece decrement count
          count++;
        //  if count is 2 return true
          if (count === 2) {
            return true;
        //  else if column is 'n'-1 return false
          } else if (minorColIndex === 0) {
            return false;
          }
        }
        // column count - 1
        minorColIndex--;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //start at n-1, n-1
      var n = this.rows().length;
      // loop through rows
      for (var row = 0; row < (n - 1); row++) {
        // if on first row
        if (row === 0) {
          // loop through columns
          for (var col = n - 1; col > 0; col--) {
            if (this.hasMinorDiagonalConflictAt(row, col)) {
              return true;
            }
          }
        }
        // check row index and col index n - 1
        if (this.hasMinorDiagonalConflictAt(row, n - 1)) {
          return true;
        }
      }

      return false;
    },
    // new function that checks row and col conflicts at once
    hasAnyConflict: function(rowIndex, colIndex) {
      // Checks major and minor di and Row Col
      var count = 0;
      var rows = this.rows();
      var n = rows.length;

      //COLUMN CHECK
      for (var i = 0; i < n; i++) {
        if(rows[i][colIndex]) {
          count++;
          if(count === 2) {
            return true;
          }
        }
      }
      //SKIPPING ROW CHECK
      //else reset count
      // count = 0;

      // //ROW CHECK
      // var row = rows[rowIndex];
      // for(var i = 0; i < n; i++){
      //   if(row[i] === 1){
      //     count++;
      //     if(count === 2){
      //       return true;
      //     }
      //   }
      // }
      //else reset count
      count = 0;

      // set Major and Minor indices

      var majorRowIndex = 0;
      var majorColIndex = 0;
      var minorRowIndex = 0;
      var minorColIndex = n;
      var distanceRight = (n - 1) - colIndex;//temp

      if(rowIndex > colIndex){
        majorRowIndex = rowIndex - colIndex;
        majorColIndex = 0;
      } else {
        majorRowIndex = 0;
        majorColIndex = colIndex - rowIndex;
      }

      if(rowIndex > distanceRight) {
        minorRowIndex = rowIndex - distanceRight;
        minorColIndex = n - 1;
      } else {
        minorRowIndex = 0;
        minorColIndex = colIndex + rowIndex;
      }

      // MINOR CHECK


      for (var row = minorRowIndex; row < n; row++) {
        // start at col index
        // check current position row & col index
        if (rows[row][minorColIndex]) {
        // if piece decrement count
          count++;
        //  if count is 2 return true
          if (count === 2) {
            return true;
        //  else if column is 'n'-1 return false
          } else if (minorColIndex === 0) {
            return false;
          }
        }
        // column count - 1
        minorColIndex--;
      }

      count = 0;

      // MAJOR CHECK

      for (var row = majorRowIndex; row < n; row++) {
        // start at col index
        // check current position row & col index
        if (rows[row][majorColIndex]) {
        // if piece increment count
          count++;
          //  if count is 2 return true
          if (count === 2) {
            return true;
          //  else if column is 'n'-1 return false
          } else if (majorColIndex === n - 1) {
            return false;
          }
        }
        // column count + 1
        majorColIndex++;
      }

      return false; //remove later
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
