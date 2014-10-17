angular.module('memoryApp', ['ngMaterial']);

angular.module('memoryApp').controller('GameCtrl', function($scope, $timeout) {

  $scope.gameForm = {
    visible: true,
    cols: 4,
    rows: 2      
  };

  $scope.game = {};

  $scope.startNewGame = function() {
    var rows = $scope.gameForm.rows;
    var cols = $scope.gameForm.cols;

    if(rows === null || isNaN(rows) || rows < 1 || rows > 10 || 
            cols === null || isNaN(cols) || cols < 1 || cols > 10) {
      alert('Rows and Columns must be between 1 and 10');
      return;
    }    

    if((rows*cols)%2 !== 0) {
      alert('Rows or Columns must be an even number');
      return;
    }

    $scope.game.rows = rows;
    $scope.game.cols = cols;

    var images = randomTiles((rows*cols)/2);
    var tiles = [];
    
    for(var i=0; i<images.length; i++) {
      tiles.push({id: i, src: images[i]});
      tiles.push({id: i, src: images[i]});
    }
    
    $scope.game.tiles = shuffle(tiles);
    
    $scope.game.matched = [];
    
    $scope.game.attempt = [];    
    
    $scope.gameForm.visible = false;

  };
        
  $scope.flip = function(tile) {
    if($scope.game.attempt.length === 2) {
      $scope.game.attempt.length = 0;
      $scope.game.attempt.push(tile);
      return;
    }
    if($scope.game.attempt.indexOf(tile) >= 0) {
      $scope.game.attempt.length = 0;
      return;
    }
    $scope.game.attempt.push(tile);
    if($scope.game.attempt[0].src === $scope.game.attempt[1].src) {      
      $scope.game.matched.push($scope.game.attempt[0]);
      $scope.game.matched.push($scope.game.attempt[1]);
    }
    $timeout(function() {
      if($scope.game.attempt.indexOf(tile) >= 0) {
        $scope.game.attempt.length = 0;
      };
     }, 1000);
      
  };
        
  var shuffle = function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
    
});

