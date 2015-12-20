/**
 * ------------------------------------------------------------------------
 * Answer row component
 * ------------------------------------------------------------------------
 */

AnswerRow = React.createClass({
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
          <LabeledText text={this.props.answer.text}/>
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

/**
 * ------------------------------------------------------------------------
 * Answer table component
 * ------------------------------------------------------------------------
 */

AnswerTable = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    keyword: React.PropTypes.object.isRequired
  },

  getMeteorData() {
    let keywordId = this.props.keyword._id;
    let answersHandle = Meteor.subscribe('answers', keywordId);

    return {
      loading: !answersHandle.ready(),
      answers: AnswersCollection.find({ keywordId: keywordId }, { sort: { createdAt: -1 } }).fetch()
    }
  },

  addAnswer(text) {
    Meteor.call('addAnswer', this.props.params.keywordId, text);
    this.refs.textInput.setValue('');
  },

  renderHead() {
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

  renderRows() {
    if (this.data.answers.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No answers added.</td>
        </tr>
      );
    }
    return this.data.answers.map((answer) => {
      return <AnswerRow key={answer._id} answer={answer}/>;
    });
  },

  render() {
    if (this.data.loading) {
      return <Loader/>;
    }
    placeholder = `Type a new answer for the keyword "${this.props.keyword.word}"`;
    return (
      <table className="ui celled table">
        <thead>
          {this.renderHead()}
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
});
