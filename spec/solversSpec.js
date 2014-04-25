describe('solvers', function() {
  window.displayBoard = function() {};

  describe('findNRooksSolution()', function() {

    xit('finds a valid solution for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionBoard = new Board(findNRooksSolution(n));

        expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function() {

    xit('finds the number of valid solutions for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function() {

    xit('finds a valid solution for n of 0-8', function() {
      _.range(1, 8).map(function(n) {
        var solutionBoard = new Board(findNQueensSolution(n));

        expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNQueensSolutions()', function() {

    xit('finds the number of valid solutions for n of 0-8', function() {
      _.range(0, 9).map(function(n) {
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];
        // var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200, ][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('countNQueensBits() for large N', function() {
    xit('n = 2', function() {
      var solutionCount = countNQueensBits(2);
      expect(solutionCount).to.be.equal(0);
    });

    xit('n = 4', function() {
      var solutionCount = countNQueensBits(4);
      expect(solutionCount).to.be.equal(2);
    });

    xit('n = 8', function() {
      var solutionCount = countNQueensBits(8);
      expect(solutionCount).to.be.equal(92);
    });

    xit('n = 11', function() {
      var solutionCount = countNQueensBits(11);
      expect(solutionCount).to.be.equal(2680);
    });

    it('n = 12', function() {
      var solutionCount = countNQueensBits(12);
      expect(solutionCount).to.be.equal(14200);
    });

    xit('n = 13', function() {
      var solutionCount = countNQueensBits(13);
      expect(solutionCount).to.be.equal(73712);
    });

    xit('n = 14', function() {
      var solutionCount = countNQueensBits(14);
      expect(solutionCount).to.be.equal(365596);
     });
    xit('n = 15', function() {
      var solutionCount = countNQueensBits(15);
      expect(solutionCount).to.be.equal(2279184);
     });

  });

});
