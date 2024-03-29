const { Link } = ReactRouter;

/**
 * ------------------------------------------------------------------------
 * Keyword row component
 * ------------------------------------------------------------------------
 */

Keyword = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    keyword: React.PropTypes.object.isRequired
  },

  getMeteorData() {
    let keywordId = this.props.keyword._id;
    let handle = Meteor.subscribe('answers', keywordId);

    return {
      countLoading: !handle.ready(),
      count: AnswersCollection.find({ keywordId: keywordId }).count()
    }
  },

  getInitialState() {
    return { edit: false };
  },

  componentDidUpdate() {
    if (this.state.edit) {
      this.refs.textInput.focus();
    }
  },

  updateKeyword(word) {
    Meteor.call('updateKeyword', this.props.keyword._id, word);
    this.setState({ edit: false });
  },

  deleteKeyword() {
    Meteor.call('removeKeyword', this.props.keyword._id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.setState({ edit: true });
  },

  handleClickDelete(event) {
    event.preventDefault();
    this.deleteKeyword();
  },

  handleClickSave(event) {
    event.preventDefault();
    this.updateKeyword(this.refs.textInput.getValue());
  },

  handleClickCancel(event) {
    event.preventDefault();
    this.setState({ edit: false });
  },

  renderCount() {
    if (this.data.countLoading) {
      return (
        <div className="ui active mini inline loader"></div>
      );
    }
    return (
      <div>
        <i className="arrow circle outline right icon"></i> {this.data.count}
      </div>
    );
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.keyword.word}
        </td>
        <td className="selectable">
          <Link to={`/keywords/${this.props.keyword._id}`}>
            {this.renderCount()}
          </Link>
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
              defaultValue={this.props.keyword.word}
              onEnter={this.updateKeyword}/>
          </div>
        </td>
        <td className="selectable">
          <Link to={`/answers/${this.props.keyword._id}`}>
            {this.renderCount()}
          </Link>
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
 * Keywords table component
 * ------------------------------------------------------------------------
 */

Keywords = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe('keywords');

    return {
      loading: !handle.ready(),
      keywords: KeywordsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  },

  addKeyword(keyword) {
    Meteor.call('addKeyword', keyword);
    this.refs.textInput.setValue('');
  },

  renderHeading() {
    if (this.data.keywords.length == 0) {
      return (
        <tr>
          <th colSpan="4">Keyword</th>
        </tr>
      );
    }
    return (
      <tr>
        <th className="fourteen wide">Keyword</th>
        <th className="two wide">Answers</th>
        <th colSpan="2">Actions</th>
      </tr>
    );
  },

  renderKeywords() {
    if (this.data.keywords.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No keywords added.</td>
        </tr>
      );
    }
    return this.data.keywords.map((keyword) => {
      return <Keyword key={keyword._id} keyword={keyword}/>;
    });
  },

  render() {
    if (this.data.loading) {
      return <Loader/>;
    }
    return (
      <div>
        <div className="ui fluid input">
          <TextInput
            ref="textInput"
            placeholder="Type a new keyword"
            onEnter={this.addKeyword}/>
        </div>
        <table className="ui celled table">
          <thead>
            {this.renderHeading()}
          </thead>
          <tbody>
            {this.renderKeywords()}
          </tbody>
        </table>
      </div>
    );
  }
});
