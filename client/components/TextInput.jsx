TextInput = React.createClass({
  componentDidMount() {
    this.refs.textInput.focus();
  },

  onKeyUp(event) {
    if (event.keyCode == 13) {
      let node = ReactDOM.findDOMNode(this.refs.textInput);
      let value = node.value.trim();
      if (value != '') {
        node.value = '';
        this.props.onEnter(value);
      }
    }
  },

  render() {
    return (
      <input
        type="text"
        ref="textInput"
        placeholder={this.props.placeholder}
        onKeyUp={this.onKeyUp}/>
    );
  }
});
