Answer = React.createClass({
  propTypes: {
    answer: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { edit: false };
  },

  componentDidUpdate() {
    if (this.state.edit) {
      this.refs.textInput.focus();
    }
  },

  updateAnswer(text) {
    Meteor.call('updateAnswer', this.props.answer._id, text);
    this.setState({ edit: false });
  },

  deleteAnswer() {
    Meteor.call('removeAnswer', this.props.answer._id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.setState({ edit: true });
  },

  handleClickDelete(event) {
    event.preventDefault();
    this.deleteAnswer();
  },

  handleClickSave(event) {
    event.preventDefault();
    this.updateAnswer(this.refs.textInput.getValue());
  },

  handleClickCancel(event) {
    event.preventDefault();
    this.setState({ edit: false });
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.answer.text}
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
              defaultValue={this.props.answer.text}
              onEnter={this.updateAnswer}/>
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

Answers = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    data = {};
    keywordId = this.props.params.keywordId;

    if (Meteor.subscribe('keyword', keywordId).ready()) {
      data.keyword = KeywordsCollection.findOne({ _id: keywordId });
    }
    if (Meteor.subscribe('answers', keywordId).ready()) {
      data.answers = AnswersCollection.find({}, {
        sort: { createdAt: -1 }
      }).fetch();
    }
    return data;
  },

  addAnswer(text) {
    Meteor.call('addAnswer', this.props.params.keywordId, text);
    this.refs.textInput.setValue('');
  },

  renderHeading() {
    if (this.data.answers.length == 0) {
      return (
        <tr>
          <th colSpan="3">Answer</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>Answer</th>
        <th colSpan="2">Actions</th>
      </tr>
    );
  },

  renderAnswers() {
    if (this.data.answers.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No answers added.</td>
        </tr>
      );
    }
    return this.data.answers.map((answer) => {
      return <Answer key={answer._id} answer={answer}/>;
    });
  },

  render() {
    if (!this.data.keyword || !this.data.answers) {
      return <Loader/>;
    }
    placeholder = `Type a new answer for the keyword "${this.data.keyword.word}"`
    return (
      <div>
        <div className="ui fluid input">
          <TextInput
            ref="textInput"
            placeholder={placeholder}
            onEnter={this.addAnswer}/>
        </div>
        <table className="ui celled table">
          <thead>
            {this.renderHeading()}
          </thead>
          <tbody>
            {this.renderAnswers()}
          </tbody>
        </table>
      </div>
    );
  }
});
