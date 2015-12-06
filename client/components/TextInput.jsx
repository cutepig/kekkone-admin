TextInput = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onEnter: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.refs.textInput.focus();
  },

  onKeyUp(event) {
    if (event.keyCode == 13) {
      let node = ReactDOM.findDOMNode(this.refs.textInput);
      let value = node.value.trim();
      if (value != '') {
        this.props.onEnter(value);
      }
    }
  },

  getValue() {
    return this.refs.textInput.value;
  },

  setValue(value) {
    this.refs.textInput.value = value;
  },

  focus() {
    value = this.refs.textInput.value;
    this.refs.textInput.value = '';
    this.refs.textInput.focus();
    this.refs.textInput.value = value;
  },

  render() {
    return (
      <input
        type="text"
        ref="textInput"
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        onKeyUp={this.onKeyUp}/>
    );
  }
});
