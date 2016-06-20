/**
 * Created by apple on 16/6/16.
 */

var Editer = React.createClass({
    getInitialState: function () {
        return {value: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](http://freecodecamp.com/hermanfassett)*'}
    },
    handleChange: function () {
        this.setState({value: this.refs.textarea.value});
        this.refs.result.scrollTop = this.refs.textarea.scrollTop;
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-6">
                    <h3>Input</h3>
                    <textarea
                        ref="textarea"
                        onChange={this.handleChange}
                        defaultValue={this.state.value}
                        />
                </div>
                <div className="col-6">
                    <h3>Output</h3>
                    <div
                        ref="result"
                        className='result'
                        dangerouslySetInnerHTML={{ __html: marked(this.state.value, {sanitize: true}) }}
                        />
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Editer />, document.getElementById('content'));