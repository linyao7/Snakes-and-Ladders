

angular.module("Snakes.controllers", [])
    .controller("boardController", function($scope){
        $scope.newGame = function(){
            var engine = new gameEngine();
            engine.numPlayers(3);
            $scope.players = engine.getMainPlayers().getPlayers();
            $scope.curPlayer = engine.getCurPlayer();
 /*           $scope.Dice1 = engine.getMainDice().getDice1();
            $scope.Dice2 = engine.getMainDice().getDice2();*/
            $scope.playerTurn = function(){
                engine.playerTurn($scope.curPlayer);
                $scope.curPlayer = engine.getCurPlayer();
                $scope.Dice1 = engine.getMainDice().getDice1();
                $scope.Dice2 = engine.getMainDice().getDice2();
            }
            $scope.board = engine.getMainBoard().getBoard();
            $scope.locatePlayer = function(name){ 
                return engine.locatePlayer(name);
            }
        }   
    
    


       

    })

    .controller("playerController",function($scope){
        


});



    
