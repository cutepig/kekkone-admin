WordTableContainer = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let categoryName = this.props.params.categoryName;
    let categoryHandle = Meteor.subscribe('category', categoryName);

    return {
      loading: !categoryHandle.ready(),
      category: CategoriesCollection.findOne({ name: categoryName })
    };
  },

  addWord(text) {
    Meteor.call('addWord', this.data.category._id, text);
    this.refs.textInput.setValue('');
  },

  handleClickCreate(event) {
    event.preventDefault();
    Meteor.call('addCategory', this.props.params.categoryName);
  },

  renderEmpty() {
    return (
      <div className="ui negative icon message">
        <i className="warning circle icon"></i>
        <div className="content">
          <div className="header">
            Category <span className="ui large red label">{this.props.params.categoryName}</span> doesn't exist
          </div>
          <p>
            <a href="" onClick={this.handleClickCreate}>Dare to create it?</a>
          </p>
        </div>
      </div>
    )
  },

  render() {
    if (this.data.loading) {
      return <Loader/>;
    }
    if (!this.data.category) {
      return this.renderEmpty();
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
        <WordTable category={this.data.category}/>
      </div>
    );
  }
});
