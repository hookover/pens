var Panel = ReactBootstrap.Panel, Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button, Input = ReactBootstrap.Input;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Modal = ReactBootstrap.Modal;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var ListGroup = ReactBootstrap.ListGroup,ListGroupItem = ReactBootstrap.ListGroupItem;
var PanelGroup = ReactBootstrap.PanelGroup;
var FormGroup = ReactBootstrap.FormGroup, FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Form = ReactBootstrap.Form;

var storage = window.localStorage;//html5本地

var MainGroup = React.createClass({
    render: function(){
        return (
            <CookBookList
                cookbooks={this.props.cookbooks}
                update={this.props.update}
                remove={this.props.remove}
                />
        )
    }
});
var CookBookList = React.createClass({
    // 为什么将Panel 和 PanelGroup 独立成两个组件后，无法缩放？
    getInitialState() {
        return {
            activeKey: '1'
        };
    },
    handleSelect(activeKey) {
        this.setState({ activeKey });
    },
    render(){
        var updateFunc = this.props.update;
        var removeFunc = this.props.remove;
        var topData = this.props.cookbooks;

        var cookbooks = this.props.cookbooks.map(function (cookbook , index) {
            var str = cookbook.ingredients;
            str = str.replace(/[，]/,',');
            var itemList = str.split(',');
            itemList = itemList.map(function (item) {
                if(item != ''){
                    return <ListGroupItem>{item}</ListGroupItem>
                }
            });
            return (
                <Panel header={cookbook.title} eventKey={index}>
                    <h4>食材列表</h4>
                    <ListGroup>
                        {itemList}
                    </ListGroup>
                    <ButtonToolbar>
                        <ModalButtonBox topData={topData} {...cookbook} update={updateFunc}/>
                        <Button bsStyle="danger" onClick={removeFunc.bind(this,cookbook)}>删除</Button>
                    </ButtonToolbar>
                </Panel>
            );
        });
        return (
            <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                {cookbooks}
            </PanelGroup>
        )
    }
});
var ModalButtonBox = React.createClass({
    getInitialState(){
        return {
            show: false
        }
    },
    getDefaultProps(){
        return {
            item: {
                title: '',
                ingredients: ''
            }
        }
    },
    showModal() {
        this.setState({show:true});
    },
    hideModal() {
        this.setState({show:false});
    },
    save: function(){
        var newCookBook = {
            oldTitle: this.props.title,
            title: ReactDOM.findDOMNode(this.refs.title).value,
            ingredients: ReactDOM.findDOMNode(this.refs.ingredients).value
        };
        if(!newCookBook.title || !newCookBook.ingredients) {
            alert('菜单名称或食材不能为空');
            return false;
        }
        this.props.update(newCookBook);
        this.hideModal();
    },
    render() {
        var buttonName = this.props.title ? '编辑菜谱' : '添加菜谱';
        var head = this.props.title ? '编辑食谱#' + this.props.title : '添加食谱';
        return (
            <div>
                <Button bsStyle="success" onClick={this.showModal}>{buttonName}</Button>
                <Modal
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>{head}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>菜名</ControlLabel>
                            <FormControl ref="title" type="text" placeholder="如：辣子鸡丁" defaultValue={this.props.title}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>原材料</ControlLabel>
                            <FormControl ref="ingredients" componentClass="textarea" defaultValue={this.props.ingredients} placeholder="请以逗号隔开, 如：鸡肉,色拉油,辣椒" />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>关闭</Button>
                        <Button onClick={this.save} bsStyle="primary">保存</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
});
var App = React.createClass({
    getInitialState: function(){
        return {
            cookbooks: []
        }
    },
    componentDidMount(){
        var cookbooks = [
            {
                'title': '拍黄瓜',
                'ingredients': '黄瓜,酱油,大蒜'
            },
            {
                'title': '三文鱼',
                'ingredients': '三文鱼,酱油,芥末'
            }
        ];
        var storageData = JSON.parse(storage.getItem('cookbooks'));
        if(storageData && storageData.length > 0) {
            cookbooks = storageData;
        }
        this.setState({cookbooks:cookbooks})
    },
    componentDidUpdate(){
        storage.setItem('cookbooks',JSON.stringify(this.state.cookbooks));
    },
    update(newData){
        if(newData.oldTitle != ''){
            this.state.cookbooks = this.state.cookbooks.filter(function (cookbook) {
                if(cookbook.title == newData.oldTitle) {
                    return false;
                }
                return true;
            });
        }
        newData = { //过滤oldTitle
            title: newData.title,
            ingredients: newData.ingredients
        };
        this.state.cookbooks.push(newData);
        this.setState(this.state.cookbooks);
    },
    remove(data){
        this.setState({
            cookbooks: this.state.cookbooks.filter(function(cookbook){
                if(cookbook.title == data.title){
                    return false;
                }
                return true;
            })
        });
    },
    showModal(){
        this.state.Modal.show = true;
    },
    render: function () {
        return (
            <div>
                <MainGroup cookbooks={this.state.cookbooks} update={this.update} remove={this.remove}/>
                <ModalButtonBox topData={this.state.cookbooks} update={this.update}/>
            </div>
        )
    }
});
ReactDOM.render(<App/>, document.getElementById('app'));