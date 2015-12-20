AnswerTableContainer = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let keywordId = this.props.params.keywordId;
    let keywordHandle = Meteor.subscribe('keyword', keywordId);

    return {
      loading: !keywordHandle.ready(),
      keyword: KeywordsCollection.findOne(keywordId)
    };
  },

  addAnswer(text) {
    Meteor.call('addAnswer', this.props.params.keywordId, text);
    this.refs.textInput.setValue('');
  },

  render() {
    if (this.data.loading) {
      return <Loader/>;
    }
    placeholder = `Type a new answer for the keyword "${this.data.keyword.word}"`;
    return (
      <div>
        <div className="ui fluid input">
          <TextInput
            ref="textInput"
            placeholder={placeholder}
            onEnter={this.addAnswer}/>
        </div>
        <AnswerTable keyword={this.data.keyword}/>
      </div>
    );
  }
});
