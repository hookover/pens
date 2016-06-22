/**
 * Created by apple on 16/6/16.
 */

var BodyHeader = React.createClass({
    render: function() {
        return(
            <header>
                <a href="http://www.freecodecamp.com">
                    <img className="nav-logo" src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="FreeCodeCamp logo" />
                </a>
            </header>
        );
    }
});
var BodyFoot = React.createClass({
    render: function(){
        return(
            <footer>
                <div className="container">
                    <p>*** By <a href="http://www.freecodecamp.cn/baoniu">@baoniu</a> ***</p>
                </div>
            </footer>
        );
    }
});
var Body = React.createClass({
    getInitialState: function () {
        return {
            users: []
        }
    },
    componentWillMount : function(){
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    users: result
                });
            }
        }.bind(this));
    },
    renderData: function(){
        if(this.state.users.length === 0){
            return (
                <tr>
                    <td className="center" colSpan="4">数据加载中，请稍后……</td>
                </tr>
            )
        }
        return this.state.users.map(function(user, index){
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        <img className="logo" src={user.img} />
                        <a href={"http://www.freecodecamp.com/"+user.username} target="_blank">{user.username}</a>
                    </td>
                    <td>{user.recent}</td>
                    <td>{user.alltime}</td>
                </tr>
            )
        });
    },
    handleClick: function (type) {
        if(this.props.apitype != type) {
            this.props.apitype = type;
            this.props.source = 'http://fcctop100.herokuapp.com/api/fccusers/top/' + type;
            if(type == 'recent') {
                this.props.recent = 'sortable sorted';
                this.props.alltime = 'sortable';
            }else{
                this.props.recent = 'sortable';
                this.props.alltime = 'sortable sorted';
            }
            this.componentWillMount();
            console.log('re update...');
        }
    },
    render: function() {
        var tableValues = this.renderData();
        return (
            <div>
                <BodyHeader/>
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped table-bordered">
                            <thead >
                            <tr classNameName="top100" id="colheaders">
                                <th className="idcol">
                                    #
                                </th>
                                <th >
                                    Camper Name
                                </th>
                                <th className={this.props.recent ? this.props.recent : 'sortable'} id="defaultsort" onClick={this.handleClick.bind(this,'recent')}>
                                    Points in past 30 days
                                </th>
                                <th className={this.props.alltime ? this.props.alltime : 'sortable'} onClick={this.handleClick.bind(this,'alltime')}>
                                    All time points
                                </th>
                            </tr>
                            </thead>
                            <tbody>{ tableValues }</tbody>
                        </table>
                    </div>
                </div>
                <BodyFoot/>
            </div>
        );
    }
});
ReactDOM.render(<Body source="http://fcctop100.herokuapp.com/api/fccusers/top/recent/" apitype='recent' recent='sortable sorted'/>, document.getElementById('content'));