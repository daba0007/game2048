function AI(score,board){             // ai实现2048，参数是此时的棋盘

    var added = new Array();        // 作为判断方格是否已经处理过

    // 判断是否能左移
    function canMoveLeft( board ) {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (board[i][j] != 0)
                    if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                        return true;

        return false;
    }

    // 判断是否能右移
    function canMoveRight( board ){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( board[i][j] !=0  &&  j != 3)
                    if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                        return true;

        return false;
    }

    // 判断是否能上移
    function canMoveUp( board ){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( board[i][j] !=0  &&  i != 0)
                    if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                        return true;
        return false;
    }

    // 判断是否能下移
    function canMoveDown( board ){
        for(var i = 0;i<4;i++)
            for(var j = 0;j<4;j++)
                if( board[i][j] !=0  &&  i != 3)
                    if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                        return true;
        return false;
    }

    // 判断水平方向是否有障碍物
    function noBlockHorizontal(row, col1, col2, board){
        for(var i = col1 + 1; i<col2; i++)
            if(board[row][i]!=0)
                return false;
        return true;
    }

    // 判断竖直方向是否有障碍物
    function noBlockVertical(col, row1, row2, board){
        for(var i = row1 + 1; i<row2; i++)
            if(board[i][col]!=0)
                return false;
        return true;
    }

    // 将合并的数组值置为0
    function isaddedArray(){
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                added[i][j] = 0;
            }
       }
    }

    // 将格子往左移
    function moveLeft(board) {
        isaddedArray();
        // 执行左移
        for (var i = 0; i < 4; i++)
            for (var j = 1; j < 4; j++) {                                                               //第一列的数字不可能向左移动
                if (board[i][j] != 0) {
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0  &&  noBlockHorizontal(i, k, j, board)) {                    //落脚位置的是否为空  &&  中间没有障碍物
                            //move
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if (board[i][k] == board[i][j]  &&  noBlockHorizontal(i, k, j, board)) {     //落脚位置的是否为空  &&  中间没有障碍物
                            //add
                            if (added[i][k] != 0) { //目标落脚点是否完成过合并
                                board[i][k] = board[i][j];
                                board[i][j] = 0;
                            }
                            else {
                                board[i][k] += board[i][j];
                                board[i][j] = 0;
                                added[i][k] = 1;
                            }
                            continue;
                        }
                    }
                }
            }
        return board;
    }

    // 将格子往左移
    function moveRight(board){
        isaddedArray();
        // 执行右移
        for(var i = 0;i<4;i++)
            for(var j = 2;j>=0;j--){                                                                    //最后一列的数字不可能向右移动
                if(board[i][j] !=0){
                    for(var k = 3;k>j;k--){
                        if(board[i][k] == 0  &&  noBlockHorizontal(i , j, k, board)){                     //落脚位置的是否为空  &&  中间没有障碍物
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[i][k] == board[i][j]  &&  noBlockHorizontal(i , j, k, board)){
                             if(added[i][k]!=0){
                                    board[i][k-1] = board[i][j];
                                    board[i][j] = 0;
                            }
                            else{
                                board[i][k] += board[i][j];
                                board[i][j] = 0;
                                added[i][k] = 1;
                            }
                            continue;
                        }
                    }
                }
            }
        return board;
    }

    // 将格子往上移
    function moveUp(board){
        isaddedArray();
        //执行上移
        for(var j = 0;j<4;j++)
            for(var i = 1;i<4;i++){
                if(board[i][j] !=0){
                    for(var k = 0;k<i;k++){
                        if(board[k][j] == 0  &&  noBlockVertical(j , k, i, board)){                           // 落脚位置的是否为空  &&  中间没有障碍物
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j]  &&  noBlockVertical(j , k, i, board)){            // 落脚位置的数字和本来的数字相等  &&  中间没有障碍物
                            if(added[k][j]!=0){
                                board[k+1][j] = board[i][j];
                                board[i][j] = 0;
                            }
                            else{
                                board[k][j] += board[i][j];
                                board[i][j] = 0;
                                added[k][j] = 1;
                            }
                            continue;
                        }
                    }
                }
            }
        return board;
    }

    // 将格子往下移
    function moveDown(board){
        isaddedArray();
        // 执行下移
        for(var j = 0;j<4;j++)
            for(var i = 2;i>=0;i--){
                if(board[i][j] !=0){
                    for(var k = 3;k>i;k--){
                        if(board[k][j] == 0  &&  noBlockVertical(j , i, k, board)){                           // 落脚位置的是否为空  &&  中间没有障碍物
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }
                        else if(board[k][j] == board[i][j]  &&  noBlockVertical(j , i, k, board)){           // 落脚位置的数字和本来的数字相等  &&  中间没有障碍物
                            if(added[k][j]!=0){
                                board[k-1][j] = board[i][j];
                                board[i][j] = 0;
                            }
                            else{
                                board[k][j] += board[i][j];
                                board[i][j] = 0;
                                added[k][j] = 1;
                            }
                            continue;
                        }
                    }
                }
            }
        return board;
    }

    // 得到平滑性
    // 平滑性是指每个方块与其直接相邻方块数值的差
    // 计算方法先求行的差的和，在求列的差的和，再相加。
    // 如果所在方格为空，差做0处理。
    // 数字越大说明越不平滑，所以结尾返回负数，减分项
    function smoothness(board){
        var smooth =0;
        for(var i = 0;i<4;i++){
            for(var j = 0;j<3;j++){
                if(board[i][j]!=0 && board[i][j+1]!=0){
                    num =Math.abs(board[i][j]-board[i][j+1]);
                    smooth=smooth+num;
                }
            }
        }
        for(var i = 0;i<3;i++){
            for(var j = 0;j<4;j++){
                if(board[i][j]!=0 && board[i+1][j]!=0){
                    num =Math.abs(board[i][j]-board[i+1][j]);
                    smooth=smooth+num;
                }
            }
        }
        return -smooth;
    }

    //得到单调性
    //单调性是指方块从左到右，从上到下均遵循递增或递减，一般来说越单调的格局越好
    function monotonicity(board) {
      var mono=0,monorow =0,monocol =0;
        for(var i = 0;i<4;i++) {
           for(var j = 0;j<3;i++){
               for(var k = j;j<3;i++){
                   if (board[i][j]>board[i][k+1]){                                                           // 如果减，就减1
                        monorow--;
                   }
                   if (board[i][j]>board[i][k+1]){                                                           // 如果增，就加1
                        monorow++;
                   }
               }
           }
        }
        for(var i = 0;i<4;i++) {
           for(var j = 0;j<3;i++){
               for(var k = j;j<3;i++){
                   if (board[j][i]>board[k+1][i]){                                                           // 如果减，就减1
                        monocol--;
                   }
                   if (board[j][i]<board[k+1][i]){                                                           // 如果增，就加1
                        monocol++;
                   }
               }
           }
        }
        mono=Math.abs(monocol)+Math.abs(monorow);                                                           // 得到单调性
        return mono;
    }

    // 得到空格数
    function emptyCellsNum(board){
        var num=0;
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                if (board[i][j] == 0){
                    num++;
                }
            }
        }
        return num;
    }

    // 检查一个格子周围的合法性，返回是否是孤立点
    function legal(i,j,board){
        if(i==0){
            if(j==0){if(board[0][1]!=0 && board[1][0]!=0){num++;}}
            if(j==1||j==2){if(board[0][j+1]!=0 && board[0][j-1]!=0 && board[1][j]!=0){num++;}}
            if(j==3){if(board[1][3]!=0 && board[0][2]!=0){num++;}}
        }
        if(i==1||i==2){
            if(j==0){if(board[i-1][j]!=0 && board[i+1][j]!=0 && board[i][1]!=0){num++;}}
            if(j==1||j==2){if(board[i][j+1]!=0 && board[i][j-1]!=0 && board[i+1][j]!=0 && board[i-1][j]!=0){num++;}}
            if(j==3){if(board[i-1][3]!=0 && board[i+1][3]!=0 && board[i][2]!=0){num++;}}
        }
        if(i==3){
            if(j==0){if(board[3][1]!=0 && board[2][0]!=0){num++;}}
            if(j==1||j==2){if(board[3][j+1]!=0 && board[3][j-1]!=0 && board[2][j]!=0){num++;}}
            if(j==3){if(board[3][2]!=0 && board[2][3]!=0){num++;}}
        }
        return num;
    }

    // 得到孤立空格数
    function island(board){
        var num=0;
        for(var i = 0;i<4;i++){
            for(var j = 0;j<4;j++){
                if (board[i][j] == 0){
                    num=num+legal(i,j,board);
                }
            }
        }
        return num;
    }

    // 评价函数
    // 评价函数是由平滑性，单调性，空格数和孤立空格数赋予权值相加得出的。
    function eval(board) {
        var smoothWeight = 0.1, monoWeight = 1.0, emptyWeight = 2.7, islandWeight = 1.0;                      // 设定权值，平滑性，单调性，空格数，孤立空格数
        imit = smoothness(board)*smoothWeight+emptyWeight*emptyCellsNum(board)+monoWeight*monotonicity(board)+island(board)*islandWeight;
        return imit;
    }

    // 得到电脑落子悲观结果,如果能跑完这个函数，说明所有的数都比beta大
    function random(gameboard,beta){
        var alpha=999999;flag=0,imit;                                                                       //flag=0说明还没有找到比beta小的值，如果有，直接退出；
        for(var i = 0;i<4;i++){
            if (flag==1){break;}
            for(var j = 0;j<4;j++){                                                                         // 悲观算法，取小的
                if(gameboard[i][j] == 0){                                                                  // 如果是0，放入2和4估值
                    gameboard[i][j]=2;
                    imit=eval(gameboard);
                    if(alpha>imit){
                        if(beta>imit){flag=1;break;}
                        else{
                            alpha=imit;row=i;col=j;                                                       // 如果alpha小，得到小alpha
                        }
                    }
                    gameboard[i][j]=4;
                    imit=eval(gameboard);
                    if (alpha>imit){
                        if(beta>imit){flag=1;break;}
                        else {
                            alpha = imit;row = i;col = j;}
                    }
                }
            }
        }
        return alpha;
    }

    // 下一步该选哪一步
    function nextMove(board) {
        var beta=-999999,move="Left",sit;

        if(canMoveLeft(board)){
            beta=random(moveLeft(board),beta);
        }
        if(canmoveRight(board)){
            sit=random(moveRight(board),beta);                                                                  // sit是做出选择后最坏的情况,beta是在sit里找到最好的
            if(sit>beta){beta=sit;move="Right";}
        }
        if(canmoveUp(board)){
            sit=random(moveUp(board),beta);
            if(sit>beta){beta=sit;move="Up";}
        }
        if(canmoveDown(board)){
            sit=random(moveDown(board),beta);
            if(sit>beta){beta=sit;move="Down";}
        }

        return move;
    }

    return nextMove(board);

}


