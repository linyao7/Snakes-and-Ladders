

function gameBoard(){
    var boardRow = 10;
    var boardColumn = 10;
    var num = boardRow * boardColumn;
    var board = [];
    
    this.newBoard = function(){
        console.log("Board initialised");
        for(var i =0;i<boardRow;i++){
            board[i]=[];
            if(i%2==1)
                num = num - boardColumn + 1;//readjust board tile values to go in a snake pattern
            for(var j=0;j<boardColumn;j++){
                if(i%2==0){
                    board[i][j] = {tileNum: num--, ladder:0, snake:0, spikes:0};//ladder and snake range from value 0-100
                }
                else{
                    board[i][j] = {tileNum: num++, ladder:0, snake:0, spikes:0};
                }    
            }
            if(i%2==1)
                num = num - boardColumn - 1;//readjust board tile values to go in a snake pattern
        }
/*        board[9][4].ladder = 20;//HARDCODED INITIALISATION
        console.log("tile num of ladder is " + board[9][4].tileNum)
        board[9][7].snake = 2;
        console.log("tile num of snake is " + board[9][7].tileNum)
        board[9][8].spikes = 3;
        console.log("tile num of spikes is " + board[9][8].tileNum)*/
    }
    this.specialTile = function(num){//set number of special tiles
        console.log("special tiles randomising");
        for(var i=0;i<num;i++){ 
            var tileSnake = Math.floor((Math.random() * 97) + 3);//cannot put on tile 1,2,100
            var tileLadder = Math.floor((Math.random() * 97) + 3);
            var tileSpikes = Math.floor((Math.random() * 97) + 3);
            for(var a=0;a<boardRow;a++){
                for(var b=0;b<boardColumn;b++){
                    if(tileSnake == board[a][b].tileNum && board[a][b].ladder==0 && board[a][b].spikes==0){
                        tempRand = Math.floor((Math.random() * 10) + 1);
                        if(board[a][b].tileNum - tempRand > 0){
                            board[a][b].snake = tempRand;
                        }
                    }
                    if(tileLadder == board[a][b].tileNum && board[a][b].snake==0 && board[a][b].spikes==0){
                        tempRand = Math.floor((Math.random() * 10) + 1);
                        if(board[a][b].tileNum + tempRand < 99){
                            board[a][b].ladder = tempRand;
                        }
                    }
                    if(tileSpikes == board[a][b].tileNum && board[a][b].snake==0 && board[a][b].ladder==0){
                            board[a][b].spikes = Math.floor((Math.random() * 10) + 1); 
                    }
                }
            }
        }
        
        
    }
    this.getBoardRow = function(){
        return boardRow;
    }
    this.getBoardColumn = function(){
        return boardColumn;
    }
    this.getBoard = function(){
        return board;
    }
}

function gamePlayers(){
    var players = [];
    
    this.createPlayer = function(name){
        players.push({name:name, hp:10, tile:1});
        console.log("Player named " + name + " created.");
    }
    
    this.nextPlayer = function(name){
        console.log("name passed in is " + name);
        for(var i=0;i<players.length;i++){
            if(name == players[i].name && i != players.length - 1 ){//check not last object
                console.log("next player is " + players[i+1].name);
                return players[i+1].name;
            }
            else if(name == players[i].name && i == players.length - 1 ){
                console.log("next player is " + players[0].name);
                return players[0].name;
            }
        }    
    }
    this.getPlayers = function(){
        return players;
    }
}

function gameDice(){
    var dice1 = 0;
    var dice2 = 0;
    
    this.diceRoll = function(){
        dice1 = Math.floor((Math.random() * 6) + 1);
        dice2 = Math.floor((Math.random() * 6) + 1);
        console.log("Rolled dice. Dice 1 is *" + dice1 + "* and Dice 2 is *" + dice2 + "* total is: " +(dice1+dice2));
    }
    this.getDice1 = function(){
        return dice1;
    }
    this.getDice2 = function(){
        return dice2;
    }
}

function gameEngine(){
    console.log("Game engine initialised");
    var mainBoard = new gameBoard();
    var mainPlayers = new gamePlayers();
    var mainDice = new gameDice();
    var curPlayer;
    mainBoard.newBoard();
    mainBoard.specialTile(4);
    
    
    
    
    this.numPlayers = function(num){
        for(var i=0;i<num;i++){
            mainPlayers.createPlayer("Player" + i);
        }
        curPlayer = mainPlayers.getPlayers()[0].name;
        console.log("Current Player is: " + curPlayer);
    }
    
    this.locatePlayer = function(name){
        for(var i=0;i<mainPlayers.getPlayers().length;i++){
            if(name==mainPlayers.getPlayers()[i].name){
                for(var a=0;a<mainBoard.getBoardRow();a++){
                    for(var b=0;b<mainBoard.getBoardColumn();b++){
                        if(mainPlayers.getPlayers()[i].tile == mainBoard.getBoard()[a][b].tileNum){
/*
                            console.log("inside locatePlayer... Player" + name + " is at "+ mainBoard.getBoard()[a][b].tileNum);
*/
                            return mainBoard.getBoard()[a][b].tileNum;
                        }
                    }
                }    
            }
        }
    }
    this.playerTurn = function(name){//moves player
        console.log("******New Turn******");
        mainDice.diceRoll();
        for(var i=0;i<mainPlayers.getPlayers().length;i++){
            if(name == mainPlayers.getPlayers()[i].name){
                console.log("Player name matched");
                mainPlayers.getPlayers()[i].tile += mainDice.getDice1() + mainDice.getDice2();
                console.log("After dice, player now at " + mainPlayers.getPlayers()[i].tile);
                if(mainPlayers.getPlayers()[i].tile==100){//win condition
                    console.log("Player tile is 100, game ends. Player wins.");
                }
                else if(mainPlayers.getPlayers()[i].tile > 100){
                    mainPlayers.getPlayers()[i].tile = 100 - (mainPlayers.getPlayers()[i].tile - 100);//backwards movement
                }
                 for(var a=0;a<mainBoard.getBoardRow();a++){
                    for(var b=0;b<mainBoard.getBoardColumn();b++){
                        if(mainPlayers.getPlayers()[i].tile == mainBoard.getBoard()[a][b].tileNum){
                            console.log("Before snakes/ladder player is at " + mainPlayers.getPlayers()[i].tile);
                            mainPlayers.getPlayers()[i].tile += mainBoard.getBoard()[a][b].ladder;
                            mainPlayers.getPlayers()[i].tile -= mainBoard.getBoard()[a][b].snake;
                            mainPlayers.getPlayers()[i].hp -= mainBoard.getBoard()[a][b].spikes;
                            console.log("After snakes/ladder player is at " + mainPlayers.getPlayers()[i].tile);
                            console.log("After spikes player is left with " + mainPlayers.getPlayers()[i].hp + " hp.");
                            curPlayer = mainPlayers.nextPlayer(curPlayer);//next player's turn
                            return;//stop matching numbers after computing tile
                        }
                    }
                }//end of board traversing
            }   
        }//end of players traversing
        
        
    }
    this.getCurPlayer = function(){
        return curPlayer;
    }
    this.getMainDice = function(){
        return mainDice;
    }
    this.getMainPlayers = function(){
        return mainPlayers;
    }
    this.getMainBoard = function(){
        return mainBoard;
    }
    
    
    
}