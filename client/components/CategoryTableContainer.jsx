CategoryTableContainer = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let categoriesHandle = Meteor.subscribe('categories');

    return {
      loading: !categoriesHandle.ready(),
      categories: CategoriesCollection.find({}, { sort: { createdAt: -1 } }).fetch()
    };
  },

  addCategory(categoryName) {
    Meteor.call('addCategory', categoryName);
    this.refs.textInput.setValue('');
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
            placeholder="Type a new word category"
            onEnter={this.addCategory}/>
        </div>
        <CategoryTable categories={this.data.categories}/>
      </div>
    );
  }
});
