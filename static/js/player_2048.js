var theplayer_board = new Array();
var theplayer_score = 0;
var top = 240;

var game = new Board(theplayer_board,theplayer_score);

// 开始一盘新游戏
$(document).ready(function(e){
    game.newgame();
});

$('#player_newgame').click(function() {
    game.newgame();
});

//事件响应循环
$(document).keydown(function(event){
    switch (event.keyCode) {
    case 65://left
        if(game.moveLeft()){
            //setTimeout("generateOneNumber()",210);
            game.getScore
            game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            setTimeout("game.isgameover()",400);//300毫秒
        }
        break;
    case 87://up
        if(game.moveUp()){
            game.getScore();
            game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            setTimeout("game.isgameover()",400);//300毫秒
        }
        break;
    case 68://right
        if(game.moveRight()){
            game.getScore();
            game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            setTimeout("game.isgameover()",400);//300毫秒
        }
        break;
    case 83://down
        if(game.moveDown()){
            game.getScore();
            game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            setTimeout("game.isgameover()",400);//300毫秒
        }
        break;
    }
});






