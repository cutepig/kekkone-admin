Word = React.createClass({
  propTypes: {
    word: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { edit: false };
  },

  componentDidUpdate() {
    if (this.state.edit) {
      this.refs.textInput.focus();
    }
  },

  updateWord(text) {
    Meteor.call('updateWord', this.props.word._id, text);
    this.setState({ edit: false });
  },

  deleteWord() {
    Meteor.call('removeWord', this.props.word._id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.setState({ edit: true });
  },

  handleClickDelete(event) {
    event.preventDefault();
    this.deleteWord();
  },

  handleClickSave(event) {
    event.preventDefault();
    this.updateWord(this.refs.textInput.getValue());
  },

  handleClickCancel(event) {
    event.preventDefault();
    this.setState({ edit: false });
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
            <TextInput
              ref="textInput"
              defaultValue={this.props.word.text}
              onEnter={this.updateWord}/>
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

  addWord(text) {
    Meteor.call('addWord', this.props.params.categoryId, text);
    this.refs.textInput.setValue('');
  },

  renderHeading() {
    if (this.data.words.length == 0) {
      return (
        <tr>
          <th colSpan="3">Word</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>Word</th>
        <th colSpan="2">Actions</th>
      </tr>
    );
  },

  renderWords() {
    if (this.data.words.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No words added.</td>
        </tr>
      );
    }
    return this.data.words.map((word) => {
      return <Word key={word._id} word={word}/>;
    });
  },

  render() {
    if (!this.data.category || !this.data.words) {
      return <Loader/>;
    }
    placeholder = `Type a new word for the category "${this.data.category.name}"`;
    return (
      <div>
        <div className="ui fluid input">
          <TextInput
            ref="textInput"
            placeholder={placeholder}
            onEnter={this.addWord}/>
        </div>
        <table className="ui celled table">
          <thead>
            {this.renderHeading()}
          </thead>
          <tbody>
            {this.renderWords()}
          </tbody>
        </table>
      </div>
    );
  }
});
