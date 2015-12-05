const { Link } = ReactRouter;

Category = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    category: React.PropTypes.object.isRequired
  },

  getMeteorData() {
    categoryId = this.props.category._id;
    Meteor.subscribe('words', categoryId);
    return {
      count: WordsCollection.find({categoryId: categoryId}).count()
    }
  },

  getInitialState() {
    return {
      edit: false,
    }
  },

  componentDidUpdate() {
    if (this.state.edit) {
      value = this.refs.textInput.value;
      this.refs.textInput.value = '';
      this.refs.textInput.focus();
      this.refs.textInput.value = value;
    }
  },

  saveCategory() {
    text = this.refs.textInput.value.trim();
    Meteor.call('updateCategory', this.props.category._id, text);
  },

  deleteCategory() {
    Meteor.call('removeCategory', this.props.category._id);
  },

  handleClickEdit(event) {
    this.setState({ edit: true });
    event.preventDefault();
  },

  handleClickDelete(event) {
    this.deleteCategory();
    event.preventDefault();
  },

  handleClickSave(event) {
    this.saveCategory();
    this.setState({ edit: false });
    event.preventDefault();
  },

  handleClickCancel(event) {
    this.setState({ edit: false });
    event.preventDefault();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      this.saveCategory();
      this.setState({ edit: false });
    }
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.category.text}
        </td>
        <td className="selectable">
          <Link to={`/vocabulary/${this.props.category._id}`}>
            <i className="arrow circle outline right icon"></i> {this.data.count}
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
            <input
              type="text"
              ref="textInput"
              defaultValue={this.props.category.text}
              onKeyUp={this.handleInput}/>
          </div>
        </td>
        <td className="selectable">
          <Link to={`/vocabulary/${this.props.category._id}`}>
            <i className="arrow circle outline right icon"></i> {this.data.count}
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

Categories = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    data = {};

    if (Meteor.subscribe('categories').ready()) {
      data.categories = CategoriesCollection.find({}, {
        sort: { createdAt: -1 }
      }).fetch();
    }

    return data;
  },

  addCategory(category) {
    Meteor.call('addCategory', category);
  },

  renderCategories() {
    return this.data.categories.map((category) => {
      return <Category key={category._id} category={category}/>;
    });
  },

  render() {
    if (!this.data.categories) {
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
        <table className="ui celled table">
          <thead>
            <tr>
              <th className="fourteen wide">Category</th>
              <th className="two wide">Word Count</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCategories()}
          </tbody>
        </table>
      </div>
    );
  }
});
