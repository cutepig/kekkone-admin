Word = React.createClass({
  propTypes: {
    word: React.PropTypes.object.isRequired
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

  saveWord() {
    WordsCollection.update(this.props.word._id, {
      $set: { text: this.refs.textInput.value.trim() }
    });
  },

  deleteWord() {
    WordsCollection.remove(this.props.word._id);
  },

  handleClickEdit(event) {
    this.setState({ edit: true });
    event.preventDefault();
  },

  handleClickDelete(event) {
    this.deleteWord();
    event.preventDefault();
  },

  handleClickSave(event) {
    this.saveWord();
    this.setState({ edit: false });
    event.preventDefault();
  },

  handleClickCancel(event) {
    this.setState({ edit: false });
    event.preventDefault();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      this.saveWord();
      this.setState({ edit: false });
    }
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.word.text}
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickEdit}>
            <i className="edit icon"/> Edit
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickDelete}>
            <i className="trash icon"/> Delete
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
              defaultValue={this.props.word.text}
              onKeyUp={this.handleInput}/>
          </div>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickSave}>
            <i className="save icon"/> Save
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickCancel}>
            <i className="cancel icon"/> Cancel
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

Words = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      category: CategoriesCollection.findOne(this.props.params.categoryId),
      words: WordsCollection.find(
          { categoryId: this.props.params.categoryId },
          { sort: {createdAt: -1} }
        ).fetch()
    }
  },

  componentDidMount() {
    this.refs.textInput.focus();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      let textInput = ReactDOM.findDOMNode(this.refs.textInput);
      WordsCollection.insert({
        text: textInput.value.trim(),
        categoryId: this.props.params.categoryId,
        createdAt: new Date()
      });
      textInput.value = '';
    }
  },

  renderWords() {
    return this.data.words.map((word) => {
      return <Word key={word._id} word={word}/>;
    });
  },

  render() {
    let placeholder = `Type a new word for the category "${this.data.category.text}"`;

    return (
      <div>
        <div className="ui fluid input">
          <input
            type="text"
            ref="textInput"
            placeholder={placeholder}
            onKeyUp={this.handleInput}/>
        </div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Word</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderWords()}
          </tbody>
        </table>
      </div>
    );
  }
});
