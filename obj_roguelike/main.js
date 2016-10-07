
class monster{
    constructor(){

    }

}
class Hero {

    attack(weapon, monster){

    }
}
var Game = React.createClass({
    getInitialState: function(){
        return {
            soil: 'soil',    //泥图
            room: 'room',    //房间
            wall: 'wall',    //墙
            tunnel: 'tunnel', //隧道
            end: 'end',      //地图边界

            max_room_width: 20,     //房间最大宽度
            max_room_height: 20,    //房间最大高度
            min_room_width: 10,  //房间最小宽度
            min_room_height: 10, //房间最小高度
            show_weight: 50,    //地图显示区域宽度
            show_height: 50,    //地图显示区域高度

            map_width: 100,     //地图宽度
            map_height: 50,     //地图高度
            mapData: [],        //地图数据
            walls: [            //所有墙的坐标
                //{x: 0, y:0}
            ],

            role: {                 //角色
                coordinate: {       //坐标
                    x:0,
                    y:0
                },
                life:  100,         //初始生命值
                weapon: [],         //装备
                level: 0            //等级
            }
        }
    },
    /*
     初始化基本地图
     */
    createBaseMap: function(){
        var map_height = this.state.map_height;
        var map_width = this.state.map_width;
        var tmpMap = [];
        // 构建基本地图，建造围墙和填充泥土
        for(var i = 0; i < map_height; ++i) {
            tmpMap[i] = [];
            for(var j = 0; j < map_width; ++j) {
                // 如果是地图的边，就画墙
                if(i == 0 || j == 0 || i == (map_height - 1) || j == (map_width - 1)) {
                    tmpMap[i][j] = this.state.end;
                } else {
                    tmpMap[i][j] = this.state.soil;
                }
            }
        }

        // 随机一个坐标
        var roomSize = this.randomRoomSize();
        var room_max_height = map_height - roomSize.height;
        var room_max_width = map_width - roomSize.width;

        var x = Math.floor(Math.random() * room_max_width);     // col - width
        var y = Math.floor(Math.random() * room_max_height);    // row - height

        x = x > 0 ? x : 1;
        y = y > 0 ? y : 1;
        var max_x = x + roomSize.width;
        var max_y = y + roomSize.height;

        // 创造第一个房间
        for(i = y; i < max_y; ++i) {
            for(j = x; j < max_x; ++j) {
                if(i == y || j == x || i == (max_y - 1) || j == (max_x - 1)) {
                    tmpMap[i][j] = this.state.wall;
                    this.state.walls.push({y: i, x: j}); //把所有墙体放到数组以方便检索
                } else {
                    tmpMap[i][j] = this.state.room;
                }
            }
        }
        this.state.mapData = tmpMap;
    },
    randomRoomSize: function(){
        // 计算随机房间大小
        var min_room_height = this.state.min_room_height;
        var max_room_height = this.state.max_room_height;
        var min_room_width = this.state.min_room_width;
        var max_room_width = this.state.max_room_width;
        var room_height = Math.floor(min_room_height + Math.random() * (max_room_height - min_room_height)),
            room_width = Math.floor(min_room_width + Math.random() * (max_room_width - min_room_width));
        return {
            height: room_height,
            width: room_width
        }
    },
    randomWall: function(){
        //随机选择一块墙体
        var max_wall_block = this.state.walls.length - 1;
        var x,y,direction; //开挖方向
        while(true) {
            var coordinate = Math.floor(Math.random() * max_wall_block);
            x = this.state.walls[coordinate].x;
            y = this.state.walls[coordinate].y;
            var mapData = this.state.mapData;
            // 墙位 上
            if(mapData[y-1][x] == this.state.room) {
                direction = 'bottom';
                break;
            }
            // 墙位 下
            if(mapData[y+1][x] == this.state.room) {
                direction = 'top';
                break;
            }
            // 墙位 左
            if(mapData[y][x-1] == this.state.room) {
                direction = 'right';
                break;
            }
            // 墙位 右
            if(mapData[y][x+1] == this.state.room) {
                direction = 'left';
                break;
            }
        }
        //确认泥土方向
        return {coordinate: coordinate, x: x, y: y , direction};
    },
    // 创建房间
    createRoom: function(){
        var loop,wall,roomSize,newRoom_x,newRoom_y,tunnel,loop_tool = 0;
        //挖墙点
        while(loop_tool < 500) {
            loop = false;
            wall = this.randomWall();   //得到随机可挖墙体
            roomSize = this.randomRoomSize();   //得到新的随机房间尺寸
            newRoom_x = 0;
            newRoom_y = 0;   //新房间左上角坐标，根据该坐标和roomSize可以得到新房间具体范围

            //尝试开挖房间数据范围
            if(wall.direction == 'top') {
                // 向上挖
                newRoom_x = wall.x - Math.floor(Math.random() * roomSize.width / 1.5) - 1;
                newRoom_y = wall.y - roomSize.height;

                tunnel = {x: wall.x, y: wall.y-1}
            }
            if(wall.direction == 'bottom') {
                // 向下挖
                newRoom_x = wall.x - Math.floor(roomSize.width / 2);
                newRoom_y = wall.y + 1;
                tunnel = {x: wall.x, y: wall.y+1}
            }
            if(wall.direction == 'left') {
                // 向左挖
                newRoom_x = wall.x - roomSize.width;
                newRoom_y = wall.y - Math.floor(roomSize.height / 2);
                tunnel = {x: wall.x - 1, y: wall.y}
            }
            if(wall.direction == 'right') {
                // 向右挖
                newRoom_x = wall.x + 1;
                newRoom_y = wall.y - Math.floor(Math.random() * roomSize.height / 1.5) - 1;
                tunnel = {x: wall.x + 1, y: wall.y}
            }
            if(newRoom_x < 1 || (newRoom_x + roomSize.width) > (this.state.map_width - 2)) {    //检测越界
                continue;
            }
            if(newRoom_y < 1 || (newRoom_y + roomSize.height) > (this.state.map_height - 2)) {  //检测越界
                continue;
            }

            // 检测是否可用
            for(var i = newRoom_y; i < (newRoom_y + roomSize.height); ++i) {
                for(var j = newRoom_x; j < (newRoom_x + roomSize.width); ++j) {
                    if(this.state.mapData[i][j] != this.state.soil) {
                        loop = true;
                    }
                }
            }
            if(!loop) {
                break;
            }
            loop_tool ++;
        }

        if(!loop){
            for(i = newRoom_y; i < (newRoom_y + roomSize.height); ++i) {
                for(j = newRoom_x; j < (newRoom_x + roomSize.width); ++j) {
                    if(i == newRoom_y || j == newRoom_x || i == (newRoom_y + roomSize.height - 1) || j == (newRoom_x + roomSize.width - 1)) {
                        this.state.mapData[i][j] = this.state.wall;
                        this.state.walls.push({y: i, x: j});                //把所有墙体放到数组以方便检索
                    } else {
                        this.state.mapData[i][j] = this.state.room;
                    }

                }
            }
            this.state.mapData[wall.y][wall.x] = this.state.tunnel;         //打开新房间通道
            this.state.mapData[tunnel.y][tunnel.x] = this.state.tunnel;     //打开旧房间通道
            this.state.walls.splice(wall.coordinate, 1);                    //将挖掉的墙从墙数据里移出
            this.state.walls.splice({x: tunnel.x, y: tunnel.y}, 1);         //将挖掉的墙从墙数据里移出
        }
    },
    //开挖地牢
    createDungeon: function(){
        var i = 0;
        var roomNumber = 2 * this.state.map_width * this.state.map_height / (this.state.max_room_width * this.state.min_room_height);

        while(i < roomNumber) {
            this.createRoom();
            ++i;
        }
    },
    createMonster: function() {

    },
    initMap: function(){
        this.createBaseMap();   //创建基础地图
        this.createDungeon();   //创建地牢
        this.createMonster();   //创造怪物

        this.forceUpdate();     //渲染数据到界面
    },
    //显示整个地图
    showMap: function(){
        return this.state.mapData.map(function (row) {
            var cols = row.map(function (col) {
                return <div className={col}></div>
            });
            return <div className='row'>{cols}</div>
        });
    },
    //显示角色可见区域
    visibleRegion: function(){

    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        this.initMap();
    },
    render: function () {
        var htmls = this.showMap();
        return (
            <div>
                <span>一个打怪游戏,目前只做好随机地图生成 </span>
                <a href="#" onClick={this.reloadMap}>刷新地图</a>
                <Action/>
                <div className="game" style={{width: this.state.map_width * 11 + 'px', height: this.state.map_height * 11 + 'px'}} >
                    {htmls}
                </div>
            </div>
        );
    },
    reloadMap: function() {
        this.initMap();
    }
});
var Action = React.createClass({
    render: function() {
        return (
            <div class="action">
                {/*<a href="#" class="btn">开始游戏</a>*/}
                {/*<a href="#" class="btn">停止</a>*/}
                {/*<a href="#" class="btn">清空</a>*/}
            </div>
        )
    }
});

ReactDOM.render(<Game/>, document.getElementById('app'));