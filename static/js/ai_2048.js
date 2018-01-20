var the_ai_board = new Array();
var the_ai_score = 0;
var top = 240;

var ai_game = new ai_Board(the_ai_board,the_ai_score)

// 开始一盘新游戏
$(document).ready(function(e){
    ai_game.newgame();
});

$('#ai_newgame').click(function() {
    ai_game.newgame();
});

// 展示ai移动
function showmove(aigame){
    if(!ai_game.nomove()){
        var grid= new Array();
        setA(ai_game.board,grid);
        var sum=ai_score.score;
        mymove = AI(sum, grid)
        //setTimeout("mymove = AI(sum, grid)",3000)
        if (mymove == "Left") {
            ai_game.moveLeft();
            ai_game.getScore();
            ai_game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_game.isgameover();
        }
        else if (mymove == "Right") {
            ai_game.moveRight();
            ai_game.getScore();
            ai_game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_game.isgameover();
        }
        else if (mymove == "Up") {
            ai_game.moveUp();
            ai_game.getScore();
            ai_game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_game.isgameover();
        }
        else {
            ai_game.moveDown();
            ai_game.getScore();
            ai_game.generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_game.isgameover();
        }
    }

}


//事件响应循环

$('#ai_start').click(function() {
    setInterval("showmove(ai_game)",300)
});
