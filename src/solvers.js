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

  var solution = new Board({n:n});

  var rowCounter = 0;
  var innerFunction = function(){
    for(var col = 0; col < n; col++){
      if(rowCounter === n){
        return;
      }
      solution.togglePiece(rowCounter, col);
      // note - come back to this
      if (solution.hasAnyRooksConflicts()){
        solution.togglePiece(rowCounter, col);
        continue;
      }
      rowCounter++;
      innerFunction();
    }
  };
  innerFunction();
  solution = solution.rows();



  // for(var row = 1; row< n; row++){
  //   for(var col = 0; col < n; col++){
  //     solution.togglePiece(row,col);
  //   }
  // }

  // for(var row = 0; row< n; row++){
  //   for(var col = 0; col < n; col++){
  //     solution.togglePiece(row,col);
  //   }
  // }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n = 1) {
    debugger;
    return 1;
  }

  var solutionCount = 0;

  var solution = new Board({n:n});

  var innerFunction = function(rowCounter){
    for(var col = 0; col < n; col++){
        // if(rowCounter === n){
        //   return;
        // }
      solution.togglePiece(rowCounter, col);
      // note - come back to this
      if (solution.hasAnyRooksConflicts()){
        solution.togglePiece(rowCounter, col);
        continue;
      }

    if (rowCounter + 1 === n) {
      debugger;
      solutionCount++;
      return;
    }

    innerFunction(rowCounter + 1);

    }
  };
  innerFunction(0);


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
