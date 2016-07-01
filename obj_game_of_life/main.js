var App = React.createClass({
    getInitialState: function() {
        return {
            row: 45,
            col: 100,
            generation: 0,
            runIndex: false,
            timeInterval: 200,
            time: 0,
            data: []
        };
    },
    initData: function() {
        var data = [];
        for(var i = 0; i < this.state.row; ++i) {
            data[i] = [];
            for(var j = 0; j < this.state.col; ++j) {
                data[i][j] = Math.random() > 0.49 ? 0 : 1;
            }
        }
        this.setState({data: data});
    },
    componentDidMount: function(){
        this.initData();
        this.startGame();
    },
    lifeAndDeath: function() {
        var self = this;
        return this.state.data.map(function (row, row_index) {
            return row.map(function (col, col_index) {
                return self.checkLifeOrDeath(col, row_index, col_index);
            });
        });
    },
    startGame: function() {
        if(!this.state.runIndex) {
            var self = this;
            var runIndex = setInterval(function () {
                self.setState({generation: self.state.generation + 1, data: self.lifeAndDeath()});
            },this.state.timeInterval);
            this.setState({runIndex: runIndex});
        }
    },
    stopGame: function() {
        clearInterval(this.state.runIndex);
        this.setState({runIndex: false});
    },
    checkLifeOrDeath: function(value, row_index, col_index){
        var length = 0;
        for(var i=-1; i<=1; ++i) {
            var row = i + row_index;
            for(var j=-1; j<=1; ++j){
                // 非本身
                if(i != 0 || j != 0) {
                    var col = j + col_index;
                    // 确定元素范围
                    if(row >= 0 && row < this.state.row && col >= 0 && col < this.state.col) {
                        // 存在元胞
                        if(this.state.data[row][col] > 0) {
                            length++;
                        }
                    }
                }
            }
        }

        // * 如果一个元胞有一个或零个邻居，会因为孤独而死亡。3个以上的邻居会因为拥挤而死亡。
        // * 如果空元胞正好有3个邻居，会在空元胞的位子生成一个元胞。
        if(length === 3 || length === 2) {
            return value < 2 ? ++value : value;
        }
        return 0;
    },
    render: function() {
        var html = this.state.data.map(function (row) {
            var cols = row.map(function (col) {
                var status = '';
                if (col === 1) status = 'younger';
                if (col === 2) status = 'older';
                return <div className={status}></div>;
            });
            return (<div className='row'>{cols}</div>);
        });

        return (
            <div>
                <div className="action">
                    <span>生生不息，世代流逝，公元：{this.state.generation} 年</span>
                    <a onClick={this.startGame} className="btn">开始</a>
                    <a onClick={this.stopGame}className="btn">停止</a>
                    <a className="btn">清空</a>
                    <a className="btn">生成数据</a>
                </div>
                <div className="game">
                    {html}
                </div>
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('app'));