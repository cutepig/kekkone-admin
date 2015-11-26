Phrases = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      phrases: PhrasesCollection.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  componentDidMount() {
    this.refs.textInput.focus();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      let textInput = ReactDOM.findDOMNode(this.refs.textInput);
      PhrasesCollection.insert({
        text: textInput.value.trim(),
        createdAt: new Date()
      });
      textInput.value = '';
    }
  },

  renderPhrases() {
    return this.data.phrases.map((phrase) => {
      return <Phrase key={phrase._id} phrase={phrase}/>;
    });
  },

  render() {
    return (
      <div>
        <div className="ui fluid input">
          <input
            type="text"
            ref="textInput"
            placeholder="Type a new phrase"
            onKeyUp={this.handleInput}/>
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
    );
  }
});
