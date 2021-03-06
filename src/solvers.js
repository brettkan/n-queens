
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

window.findSolution = function(row, n, board, validator, callback) {
  if (row === n){
    return callback();
    // var boardArray = board.rows();
    // var copy = matrixCopy(boardArray);
    // allSolutions.push(copy);
    // return;
  }

  for (var col = 0; col < n; col++){
    // place piece on board
    board.togglePiece(row, col);

    // check if board has conflict
    // if board doesn't have conflicts, recurse
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);

      if (result) {
        return result;
      }
    }

    // either way, untoggle
    board.togglePiece(row, col);
  }
};

window.findNRooksSolution = function(n) {

  var board = new Board({n:n});
  var solution = findSolution(0,n,board,"hasAnyColConflicts",function(){
    return _.map(board.rows(), function(eachRow){
      return eachRow.slice();
    });
  });


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n:n});  // not declared in a function, so each iteration still works on the same solution board

  findSolution(0, n, board, "hasAnyColConflicts", function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.returnAllNQueensSolutions = function(n) {
  var allSolutions = [];
  // matrixes don't copy directly, so need a helper function
  var matrixCopy = function(matrix){
    var result = [];
    for (var i = 0; i < matrix.length; i++){
      var copy = matrix[i].slice();
      result[i] = copy;
    }
    return result;
  };

  //function to recursively seed rooks in decision tree and sub-trees
  var innerFunction = function(rowCounter){

    if (rowCounter === n){
      var boardArray = solution.rows();
      var copy = matrixCopy(boardArray);
      allSolutions.push(copy);
      return;
    }
    for (var col = 0; col < n; col++){
      // place queen on board then check if there's conflict
      solution.togglePiece(rowCounter, col);
      // if board doesn't have conflicts, recurse


      if (!solution.checkQueenConflictsOn(rowCounter, col)) {
        innerFunction(rowCounter + 1);
      }

      // either way, untoggle
      solution.togglePiece(rowCounter, col);
    }
  };

  var solution = new Board({n:n});  // not declared in a function, so each iteration still works on the same solution board
  innerFunction(0);

  return allSolutions;
};

window.findNQueensSolution = function(n) {

  var allSolutions = returnAllNQueensSolutions(n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(allSolutions[0]));
  return allSolutions[0] || {n:n};
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = returnAllNQueensSolutions(n).length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
