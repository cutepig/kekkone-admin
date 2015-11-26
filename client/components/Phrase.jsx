Phrase = React.createClass({
  propTypes: {
    phrase: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { edit: false }
  },

  componentDidUpdate() {
    if (this.state.edit) {
      value = this.refs.textInput.value;
      this.refs.textInput.value = '';
      this.refs.textInput.focus();
      this.refs.textInput.value = value;
    }
  },

  savePhrase() {
    Phrases.update(this.props.phrase._id, {
      $set: { text: this.refs.textInput.value.trim() }
    });
  },

  deletePhrase() {
    Phrases.remove(this.props.phrase._id);
  },

  handleClickEdit(event) {
    this.setState({ edit: true });
    event.preventDefault();
  },

  handleClickDelete(event) {
    this.deletePhrase();
    event.preventDefault();
  },

  handleClickSave(event) {
    this.savePhrase();
    this.setState({ edit: false });
    event.preventDefault();
  },

  handleClickCancel(event) {
    this.setState({ edit: false });
    event.preventDefault();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      this.savePhrase();
      this.setState({ edit: false });
    }
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.phrase.text}
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickEdit}>
            <i className="edit icon" />
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickDelete}>
            <i className="trash icon" />
          </a>
        </td>
      </tr>
    );
  },

  renderEdit() {
    return (
      <tr>
        <td>
          <div className="ui fluid input">
            <input
              type="text"
              ref="textInput"
              defaultValue={this.props.phrase.text}
              onKeyUp={this.handleInput} />
          </div>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickSave}>
            <i className="save icon" />
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickCancel}>
            <i className="cancel icon" />
          </a>
        </td>
      </tr>
    );
  },

  render() {
    if (this.state.edit) {
      return this.renderEdit();
    }
    return this.renderShow();
  }
});
