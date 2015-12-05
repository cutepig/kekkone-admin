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
    text = this.refs.textInput.value.trim();
    Meteor.call('updateWord', this.props.word._id, text);
  },

  deleteWord() {
    Meteor.call('removeWord', this.props.word._id);
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
    data = {};
    categoryId = this.props.params.categoryId;

    if (Meteor.subscribe('category', categoryId).ready()) {
      data.category = CategoriesCollection.findOne({ _id: categoryId });
    }
    if (Meteor.subscribe('words', categoryId).ready()) {
      data.words = WordsCollection.find({}, { sort: {createdAt: -1} }).fetch();
    }

    return data;
  },

  addWord(word) {
    Meteor.call('addWord', this.props.params.categoryId, word);
  },

  renderWords() {
    return this.data.words.map((word) => {
      return <Word key={word._id} word={word}/>;
    });
  },

  render() {
    if (!this.data.category || !this.data.words) {
      return <Loader/>;
    }
    return (
      <div>
        <div className="ui fluid input">
          <TextInput
            ref="textInput"
            placeholder="Type a new word for the category"
            onEnter={this.addWord}/>
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
