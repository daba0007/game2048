// 生成玩家游戏棋盘
function Board(board,score){
    this.board = board;
    this.score = score;
    this.added = new Array();

    // 得到分数
    this.getScore = function(){
        document.getElementById("score").innerHTML=this.score;
    }

    // 在棋盘中随机产生2或4
    this.generateOneNumber=function (){
        if (this.nospace())
            return false;
        //随机一个位置
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
        while(true){
            if (this.board[randx][randy] == 0)
                break;
            randx = parseInt(Math.floor(Math.random()*4));
            randy = parseInt(Math.floor(Math.random()*4));
        }
        //随机一个数字，显示比例9比1
        var randNumber = Math.random()<0.9 ?2 : 4;
        //在随机位置显示随机数字
        this.board[randx][randy] = randNumber;
        showNumberWithAnimation(randx,randy,randNumber);
        return true;
    }

    // 初始化棋盘
    this.init = function(){
        this.score = 0;
        document.getElementById("score").innerHTML=this.score;
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                var gridCell = $("#grid-cell-"+i+"-"+j);
                gridCell.css("top",getPosTop(i,j));
                gridCell.css("left",getPosLeft(i,j));
            }
        }
        for(var i = 0; i<4;i++){
            this.board[i] = new Array();
            for(var j = 0;j<4;j++){
                this.board[i][j] = 0;
            }
        }
        for(var i = 0; i<4;i++){                                                                            //初始化判定合并的数组
            this.added[i] = new Array();
            for(var j = 0;j<4;j++){
                this.added[i][j] = 0;
            }
        }
        updateBoardView();                                                                                  //通知前端对board二位数组进行设定。
    }

    // 在随机生成数字的时候判断16宫格中是否还有空间
    this.nospace = function (){
        for ( var i = 0; i < 4; i++)
            for ( var j = 0; j < 4; j++)
                if (this.board[i][j] == 0)
                    return false;
        return true;
    }

    // 开始一盘新游戏
    this.newgame = function(){
        //初始化棋盘格
        this.init();
        //在随机两个各自声称的数字
        this.generateOneNumber();
        this.generateOneNumber();
    }

    //实现功能判断
    this.canMoveLeft = function (){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( this.board[i][j] !=0 )
                    if( this.board[i][j-1] == 0 || this.board[i][j-1] == this.board[i][j])
                        return true;
        return false;
    }
    this.canMoveRight = function (){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( this.board[i][j] !=0 && j != 3)
                    if( this.board[i][j+1] == 0 || this.board[i][j+1] == this.board[i][j])
                        return true;
        return false;
    }
    this.canMoveUp = function (){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( this.board[i][j] !=0 && i != 0)
                    if( this.board[i-1][j] == 0 || this.board[i-1][j] == this.board[i][j])
                        return true;
        return false;
    }
    this.canMoveDown = function (){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( this.board[i][j] !=0 && i != 3)
                    if( this.board[i+1][j] == 0 || this.board[i+1][j] == this.board[i][j])
                        return true;
        return false;
    }

    // 没有方向可以走
    this.nomove = function (){
        if(this.canMoveLeft() || this.canMoveRight()|| this.canMoveUp() || this.canMoveDown() )
            return false;
        return true;
    }

    // 将棋盘返回后台计算
     this.getBoard = function (){
            $.ajax({
                    type: 'POST',
                    url: "/get_board/",
                    dataType: "json",
                    data: {
                        'board':this.board,
                    },
                    async: false,
                    success:function(data){
                    }
            });
     }

     // 查询游戏是否结束
     this.isgameover = function (){
        if(this.nospace() && this.nomove())
            gameover();
     }

     // 将判断能否合并的数组值置为0
     this.isaddedArray = function(){
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                this.added[i][j] = 0;
            }
       }
    }

    // 判断水平方向是否有障碍物
    this.noBlockHorizontal = function (row, col1, col2){
        for(var i = col1 + 1; i<col2; i++)
            if(this.board[row][i]!=0)
                return false;
        return true;
    }
    // 判断竖直方向是否有障碍物
    this.noBlockVertical = function (col, row1, row2){
        for(var i = row1 + 1; i<row2; i++)
            if(this.board[i][col]!=0)
                return false;
        return true;
    }

    // 判断格子是否能够向左移动,可以则向左移动
    this.moveLeft = function (){
        if( !this.canMoveLeft() )
            return false;
        this.isaddedArray();
        for(var i = 0;i<4;i++)
            for(var j = 1;j<4;j++) {                                                                        //第一列的数字不可能向左移动
                if (this.board[i][j] != 0) {
                    //(i,j)左侧的元素
                    for (var k = 0; k < j; k++) {
                        if (this.board[i][k] == 0 && this.noBlockHorizontal(i, k, j)) {                        //落脚位置的是否为空 && 中间没有障碍物
                            showMoveAnimation(i, j, i, k);
                            this.board[i][k] = this.board[i][j];
                            this.board[i][j] = 0;
                            continue;
                        }
                        else if (this.board[i][k] == this.board[i][j] && this.noBlockHorizontal(i, k, j)) {         // 落脚位置的是否为空 && 中间没有障碍物
                            //move
                            showMoveAnimation(i, j, i, k);
                            //add
                            if (this.added[i][k] != 0) { //目标落脚点是否完成过合并
                                this.board[i][k+1] = this.board[i][k];
                                this.board[i][j] = 0;
                            }
                            else {
                                this.board[i][k] += this.board[i][j];
                                this.board[i][j] = 0;
                                this.added[i][k] = 1;
                                this.score += this.board[i][k];
                            }
                            continue;
                        }
                    }
                }
            }
        setTimeout("updateBoardView()",200);
        return true;
    }

    // 判断格子是否能够向右移动,可以则向右移动
    this.moveRight = function(){
        if( !this.canMoveRight())
            return false;
        this.isaddedArray();
        for(var i = 0;i<4;i++)
            for(var j = 2;j>=0;j--){
                if(this.board[i][j] !=0){
                    for(var k = 3;k>j;k--){
                        if(this.board[i][k] == 0 && this.noBlockHorizontal(i , j, k)){                    // 落脚位置的是否为空 && 中间没有障碍物
                            showMoveAnimation(i, j,i,k);
                            this.board[i][k] = this.board[i][j];
                            this.board[i][j] = 0;
                            continue;
                        }
                        else if(this.board[i][k] == this.board[i][j] && this.noBlockHorizontal(i , j, k)){        // 落脚位置的数字和本来的数字相等 && 中间没有障碍物
                            //move
                            showMoveAnimation(i, j,i,k);
                            //add
                             if(this.added[i][k]!=0){
                                    this.board[i][k-1] = this.board[i][k];
                                    this.board[i][j] = 0;
                             }
                             else{
                                this.board[i][k] += this.board[i][j];
                                this.board[i][j] = 0;
                                this.added[i][k] = 1;
                                this.score += this.board[i][k];
                             }
                            continue;
                        }
                    }
                }
            }
        setTimeout("updateBoardView()",200);
        return true;
    }

    // 判断格子是否能够向上移动，可以则向上移动
    this.moveUp = function(){
        if( !this.canMoveUp())
            return false;
        this.isaddedArray();
        for(var j = 0;j<4;j++)
            for(var i = 1;i<4;i++){
                if(this.board[i][j] !=0){
                    for(var k = 0;k<i;k++){
                        if(this.board[k][j] == 0 && this.noBlockVertical(j , k, i)){                           // 落脚位置的是否为空 && 中间没有障碍物
                            showMoveAnimation(i, j,k,j);
                            this.board[k][j] = this.board[i][j];
                            this.board[i][j] = 0;
                            continue;
                        }
                        else if(this.board[k][j] == this.board[i][j] && this.noBlockVertical(j , k, i)){    // 落脚位置的数字和本来的数字相等 && 中间没有障碍物
                            //move
                            showMoveAnimation(i, j,k,j);
                            //add
                            if(this.added[k][j]!=0){
                                this.board[k+1][j] = this.board[k][j];
                                this.board[i][j] = 0;
                            }
                            else{
                                this.board[k][j] += this.board[i][j];
                                this.board[i][j] = 0;
                                this.added[k][j] = 1;
                                this.score += this.board[k][j];
                            }
                            continue;
                        }
                    }
                }
            }
        setTimeout("updateBoardView()",200);
        return true;
    }

    // 判断格子是否能够向下移动,可以则向下移动
    this.moveDown = function(){
        if( !this.canMoveDown())
            return false;
        this.isaddedArray();
        //真正的moveDown函数//标准
        for(var j = 0;j<4;j++)
            for(var i = 2;i>=0;i--){
                if(this.board[i][j] !=0){
                    for(var k = 3;k>i;k--){
                        if(this.board[k][j] == 0 && this.noBlockVertical(j , i, k)){                        // 落脚位置的是否为空 && 中间没有障碍物
                            showMoveAnimation(i, j,k,j);
                            this.board[k][j] = this.board[i][j];
                            this.board[i][j] = 0;
                            continue;
                        }
                        //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                        else if(this.board[k][j] == this.board[i][j] && this.noBlockVertical(j , i, k)){
                            //move
                            showMoveAnimation(i, j,k,j);
                            //add
                            if(this.added[k][j]!=0){
                                this.board[k-1][j] = this.board[k][j];
                                this.board[i][j] = 0;
                            }
                            else{
                                this.board[k][j] += this.board[i][j];
                                this.board[i][j] = 0;
                                this.added[k][j] = 1;
                                this.score += this.board[k][j];
                            }
                            continue;
                        }
                    }
                }
            }
        setTimeout("updateBoardView()",200);
        return true;
    }
}
