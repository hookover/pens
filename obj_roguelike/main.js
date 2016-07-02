var Game = React.createClass({
    getInitialState: function(){
        return {
            soil: 'soil',    //泥图
            room: 'room',    //房间
            wall: 'wall',    //墙
            end: 'end',      //地图边界

            max_room_width: 16,     //房间最大宽度
            max_room_height: 16,    //房间最大高度
            min_room_width: 10,  //房间最小宽度
            min_room_height: 10, //房间最小高度
            show_weight: 50,    //地图显示区域宽度
            show_height: 50,    //地图显示区域高度

            map_width: 100,     //地图宽度
            map_height: 55,     //地图高度
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
                weapon: [],         //武器
                level: 0,           //等级
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
                } else {
                    tmpMap[i][j] = this.state.room;
                }
            }
        }

        this.setState({mapData: tmpMap});
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
    randomCoordinate: function(width, height){


        return {
            x: x,
            y: y
        }
    },
    // 创建房间
    createRoom: function(){



    },
    //开挖地牢
    createDungeon: function(){
        this.createRoom();
    },
    initMap: function(){
        this.createBaseMap();   //创建基础地图
        this.createDungeon();   //创建地牢
    },
    //显示整个地图
    showMap: function(){
        var renderHtml = this.state.mapData.map(function (row) {
            var cols = row.map(function (col) {
                return <div className={col}></div>
            });
            return <div className='row'>{cols}</div>
        });
        return renderHtml;
    },
    //显示角色可见区域
    visibleRegion: function(){

    },
    componentDidMount: function(){
        this.initMap();
    },
    render: function () {
        var htmls = this.showMap();
        return (
            <div>
                <Action/>
                <div className="game">
                    {htmls}
                </div>
            </div>
        );
    }
});
var Action = React.createClass({
    render: function() {
        return (
            <div class="action">
                <a href="#" class="btn">开始游戏</a>
                <a href="#" class="btn">停止</a>
                <a href="#" class="btn">清空</a>
            </div>
        )
    }
});

ReactDOM.render(<Game/>, document.getElementById('app'));