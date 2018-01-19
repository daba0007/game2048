// 二维数组赋值函数
function setA(a,b){
    for(var i = 0; i<4;i++){
        b[i] = new Array();
        for(var j = 0;j<4;j++){
            b[i][j] = "";
        }
    }
    for(var i = 0; i<4;i++){
        for(var j = 0;j<4;j++){
            b[i][j] = a[i][j];
        }
    }
}

// 根据board的值为cell染色
function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width : "50px",
        height : "50px",
        top : getPosTop(i, j),
        left : getPosLeft(i, j)
    }, 50);
}

// 将cell移动
function showMoveAnimation(fromx, fromy, tox, toy){

    var numberCell = $('#number-cell-'+fromx +'-'+fromy);
    numberCell.animate({top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy)},200);
}

// 根据ai_board的值为cell染色
function ai_showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#ai_number-cell-' + i + '-' + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width : "50px",
        height : "50px",
        top : getPosTop(i, j),
        left : getPosLeft(i, j)
    }, 50);
}

// 将ai_board的cell移动
function ai_showMoveAnimation(fromx, fromy, tox, toy){

    var numberCell = $('#ai_number-cell-'+fromx +'-'+fromy);
    numberCell.animate({top:getPosTop(tox,toy),
    left:getPosLeft(tox,toy)},200);
}

//定义边距
function getPosTop(i, j) {
    return 20 + i * 60;
}

//定义边距
function getPosLeft(i, j) {
    return 20 + j * 60;
}

// 设置数字的背景色
function getNumberBackgroundColor(number) {
    switch (number) {
    case 2:
        return "#eee4da";
        break;
    case 4:
        return "#ece0ca";
        break;
    case 8:
        return "#f2b179";
        break;
    case 16:
        return "#f59466";
        break;
    case 32:
        return "#f57c5f";
        break;
    case 64:
        return "#f65e3b";
        break;
    case 128:
        return "#edcf72";
        break;
    case 256:
        return "#edcc61";
        break;
    case 512:
        return "#edc850";
        break;
    case 1024:
        return "#edc53f";
        break;
    case 2048:
        return "#f0c600";
        break;
    case 4096:
        return "#ff3b39";
        break;
    case 8192:
        return "#fe1f22";
        break;
    }
    return "black";
}

// 设置颜色
function getNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}

// 前端二维数组上色
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(theplayer_board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','50px');
                theNumberCell.css('hegiht','50px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //NumberCell覆盖
                theNumberCell.css('background-color',getNumberBackgroundColor(theplayer_board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(theplayer_board[i][j]));//返回前景色
                theNumberCell.text(theplayer_board[i][j]);
            }
        }
    }
}

// 前端二维数组上色
function ai_updateBoardView(){
    $(".ai_number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#ai_grid-container").append('<div class="ai_number-cell" id="ai_number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#ai_number-cell-'+i+'-'+j);
            if(the_ai_board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','50px');
                theNumberCell.css('hegiht','50px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //NumberCell覆盖
                theNumberCell.css('background-color',getNumberBackgroundColor(the_ai_board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(the_ai_board[i][j]));//返回前景色
                theNumberCell.text(the_ai_board[i][j]);
            }
        }
    }
}

// 提示游戏结束
function gameover(){
    alert("gameover");
}