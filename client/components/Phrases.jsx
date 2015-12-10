/**
 * ------------------------------------------------------------------------
 * Phrase row component
 * ------------------------------------------------------------------------
 */

Phrase = React.createClass({
  propTypes: {
    phrase: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { edit: false };
  },

  componentDidUpdate() {
    if (this.state.edit) {
      this.refs.textInput.focus();
    }
  },

  updatePhrase(text) {
    Meteor.call('updatePhrase', this.props.phrase._id, text);
    this.setState({ edit: false });
  },

  deletePhrase() {
    Meteor.call('removePhrase', this.props.phrase._id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.setState({ edit: true });
  },

  handleClickDelete(event) {
    event.preventDefault();
    this.deletePhrase();
  },

  handleClickSave(event) {
    event.preventDefault();
    this.updatePhrase(this.refs.textInput.getValue());
  },

  handleClickCancel(event) {
    event.preventDefault();
    this.setState({ edit: false });
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.phrase.text}
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
              defaultValue={this.props.phrase.text}
              onEnter={this.updatePhrase}/>
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
 * Phrases table component
 * ------------------------------------------------------------------------
 */

Phrases = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe('phrases');

    return {
      loading: !handle.ready(),
      phrases: PhrasesCollection.find({}, { sort: { createdAt: -1 }}).fetch()
    }
  },

  addPhrase(phrase) {
    Meteor.call('addPhrase', phrase);
    this.refs.textInput.setValue('');
  },

  renderHeading() {
    if (this.data.phrases.length == 0) {
      return (
        <tr>
          <th colSpan="3">Phrase</th>
        </tr>
      );
    }
    return (
      <tr>
        <th>Phrase</th>
        <th colSpan="2">Actions</th>
      </tr>
    );
  },

  renderPhrases() {
    if (this.data.phrases.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No phrases added.</td>
        </tr>
      );
    }
    return this.data.phrases.map((phrase) => {
      return <Phrase key={phrase._id} phrase={phrase}/>;
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
            placeholder="Type a new phrase"
            onEnter={this.addPhrase}/>
        </div>
        <table className="ui celled table">
          <thead>
            {this.renderHeading()}
          </thead>
          <tbody>
            {this.renderPhrases()}
          </tbody>
        </table>
      </div>
    );
  }
});
