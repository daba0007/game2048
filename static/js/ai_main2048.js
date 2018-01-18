var ai_board = new Array();
var ai_added = new Array();
var ai_score = 0;
var ai_top = 240;

$(document).ready(function (e) {
    ai_newgame();
});

function ai_newgame() {
    //初始化棋盘格
    ai_init();
    //在随机两个各自声称的数字
    ai_generateOneNumber();
    ai_generateOneNumber();
}

function ai_init() {
    ai_score = 0;
    document.getElementById("ai_score").innerHTML = ai_score;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#ai_grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        ai_board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            ai_board[i][j] = 0;
        }
    }

    for (var i = 0; i < 4; i++) {//初始化判定合并的数组
        ai_added[i] = new Array();
        for (var j = 0; j < 4; j++) {
            ai_added[i][j] = 0;
        }
    }

    ai_updateBoardView();//通知前端对board二位数组进行设定。
}

function ai_updateBoardView() {
    $(".ai_number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#ai_grid-container").append('<div class="ai_number-cell" id="ai_number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#ai_number-cell-' + i + '-' + j);
            if (ai_board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
            } else {
                theNumberCell.css('width', '50px');
                theNumberCell.css('hegiht', '50px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                //NumberCell覆盖
                theNumberCell.css('background-color', getNumberBackgroundColor(ai_board[i][j]));//返回背景色
                theNumberCell.css('color', getNumberColor(ai_board[i][j]));//返回前景色
                theNumberCell.text(ai_board[i][j]);
            }
        }
    }
}

function ai_generateOneNumber() {
    if (nospace(ai_board))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (ai_board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    //随机一个数字，显示比例9比1
    var randNumber = Math.random() < 0.9 ? 2 : 4;
    //在随机位置显示随机数字
    ai_board[randx][randy] = randNumber;
    ai_showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

//将棋盘返回后台计算
function getBoard() {
    $.ajax({
        type: 'POST',
        url: "/get_board/",
        dataType: "json",
        data: {
            'board': ai_board,
        },
        async: false,
        success: function (data) {
        }
    });
}

function ai_isgameover() {
    if (nospace(ai_board) && nomove(ai_board))
        gameover();                                                                                         // 弹出游戏结束
}

function ai_isaddedArray() {//将判断能否合并的数组值置为0
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            ai_added[i][j] = 0;
        }
    }
}

function ai_moveLeft() {
    //判断格子是否能够向左移动
    if (!canMoveLeft(ai_board))
        return false;

    ai_isaddedArray();

    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (ai_board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (ai_board[i][k] == 0 && noBlockHorizontal(i, k, j, ai_board)) {    //落脚位置的是否为空 && 中间没有障碍物
                        //move
                        ai_showMoveAnimation(i, j, i, k);
                        ai_board[i][k] = ai_board[i][j];
                        ai_board[i][j] = 0;
                        continue;
                    }
                    else if (ai_board[i][k] == ai_board[i][j] && noBlockHorizontal(i, k, j, ai_board)) {     //落脚位置的是否为空 && 中间没有障碍物
                        //move
                        ai_showMoveAnimation(i, j, i, k);
                        //add
                        if (ai_added[i][k] != 0) { //目标落脚点是否完成过合并
                            ai_board[i][k] = ai_board[i][j];
                            ai_board[i][j] = 0;
                        }
                        else {
                            ai_board[i][k] += ai_board[i][j];
                            ai_board[i][j] = 0;
                            ai_added[i][k] = 1;
                            ai_score += ai_board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("ai_updateBoardView()", 200);
    return true;
}

function ai_moveRight() {//更多地细节信息
    //判断格子是否能够向右移动
    if (!canMoveRight(ai_board))
        return false;

    ai_isaddedArray();
    //真正的moveRight函数//标准
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {//最后一列的数字不可能向右移动
            if (ai_board[i][j] != 0) {
                //(i,j)右侧的元素
                for (var k = 3; k > j; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (ai_board[i][k] == 0 && noBlockHorizontal(i, j, k, ai_board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        ai_board[i][k] = ai_board[i][j];
                        ai_board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (ai_board[i][k] == ai_board[i][j] && noBlockHorizontal(i, j, k, ai_board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        if (ai_added[i][k] != 0) {
                            ai_board[i][k - 1] = ai_board[i][j];
                            ai_board[i][j] = 0;
                        }
                        else {
                            ai_board[i][k] += ai_board[i][j];
                            ai_board[i][j] = 0;
                            ai_added[i][k] = 1;
                            ai_score += ai_board[i][k];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("ai_updateBoardView()", 200);
    return true;
}

function ai_moveUp() {//更多地细节信息
    //判断格子是否能够向上移动
    if (!canMoveUp(ai_board))
        return false;

    ai_isaddedArray();
    //真正的moveUp函数//标准
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {//第一行的数字不可能向上移动
            if (ai_board[i][j] != 0) {
                //(i,j)上面的元素
                for (var k = 0; k < i; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (ai_board[k][j] == 0 && noBlockVertical(j, k, i, ai_board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        ai_board[k][j] = ai_board[i][j];
                        ai_board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (ai_board[k][j] == ai_board[i][j] && noBlockVertical(j, k, i, ai_board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        if (ai_added[k][j] != 0) {
                            ai_board[k + 1][j] = ai_board[i][j];
                            ai_board[i][j] = 0;
                        }
                        else {
                            ai_board[k][j] += ai_board[i][j];
                            ai_board[i][j] = 0;
                            ai_added[k][j] = 1;
                            ai_score += ai_board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("ai_updateBoardView()", 200);
    return true;
}

function ai_moveDown() {//更多地细节信息
    //判断格子是否能够向下移动
    if (!canMoveDown(ai_board))
        return false;

    ai_isaddedArray();
    //真正的moveDown函数//标准
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {//最后一行的数字不可能向下移动
            if (ai_board[i][j] != 0) {
                //(i,j)上面的元素
                for (var k = 3; k > i; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (ai_board[k][j] == 0 && noBlockVertical(j, i, k, ai_board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        ai_board[k][j] = ai_board[i][j];
                        ai_board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (ai_board[k][j] == ai_board[i][j] && noBlockVertical(j, i, k, ai_board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        if (ai_added[k][j] != 0) {
                            ai_board[k - 1][j] = ai_board[i][j];
                            ai_board[i][j] = 0;
                        }
                        else {
                            ai_board[k][j] += ai_board[i][j];
                            ai_board[i][j] = 0;
                            ai_added[k][j] = 1;
                            ai_score += ai_board[k][j];
                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("ai_updateBoardView()", 200);
    return true;
}


　


//事件响应循环
/*
$('#ai_start').click(function() {
    var second,mymove;
    while(!nomove(ai_board)){
        mymove=AI(ai_score, ai_board)
        if(mymove=="Left"){
            ai_moveLeft();
            ai_getScore();
            ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_isgameover();
        }
        else if(mymove=="Right"){
            ai_moveRight();
            ai_getScore();
            ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_isgameover();
        }
        else if(mymove=="Up"){
            ai_moveRight();
            ai_getScore();
            ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_isgameover();
        }
        else {
            ai_moveDown();
            ai_getScore();
            ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
            ai_isgameover();
        }


    }
});
*/

$(document).keydown(function(event){
    switch (event.keyCode) {
        case 39://left(a)
            mymove = AI(ai_score, ai_board)
            alert(mymove)
            if (mymove == "Left") {
                ai_moveLeft();
                ai_getScore();
                ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
                ai_isgameover();
            }
            else if (mymove == "Right") {
                ai_moveRight();
                ai_getScore();
                ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
                ai_isgameover();
            }
            else if (mymove == "Up") {
                ai_moveRight();
                ai_getScore();
                ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
                ai_isgameover();
            }
            else {
                ai_moveDown();
                ai_getScore();
                ai_generateOneNumber();//每次新增一个数字就可能出现游戏结束
                ai_isgameover();
            }
            break;
    }
});