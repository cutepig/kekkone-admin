App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      phrases: Phrases.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  componentDidMount() {
    this.refs.textInput.focus();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      let textInput = ReactDOM.findDOMNode(this.refs.textInput);
      Phrases.insert({
        text: textInput.value.trim(),
        createdAt: new Date()
      });
      textInput.value = '';
    }
  },

  renderPhrases() {
    return this.data.phrases.map((phrase) => {
      return <Phrase key={phrase._id} phrase={phrase} />;
    });
  },

  render() {
    return (
      <div>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a className="header item">Kekkone Admin</a>
            <a className="item">Vocabulary</a>
            <a className="item">Phrases</a>
            <a className="item">Keywords</a>
          </div>
        </div>
        <div className="ui container">
          <div className="ui fluid input">
            <input
              type="text"
              ref="textInput"
              placeholder="Type a new phrase"
              onKeyUp={this.handleInput} />
          </div>
          <table className="ui table">
            <thead>
              <tr>
                <th>Phrase</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderPhrases()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
