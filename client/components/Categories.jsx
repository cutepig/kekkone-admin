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
    return { edit: false };
  },

  componentDidUpdate() {
    if (this.state.edit) {
      this.refs.textInput.focus();
    }
  },

  updateCategory(name) {
    Meteor.call('updateCategory', this.props.category._id, name);
    this.setState({ edit: false });
  },

  deleteCategory() {
    Meteor.call('removeCategory', this.props.category._id);
  },

  handleClickEdit(event) {
    event.preventDefault();
    this.setState({ edit: true });
  },

  handleClickDelete(event) {
    event.preventDefault();
    this.deleteCategory();
  },

  handleClickSave(event) {
    event.preventDefault();
    this.updateCategory(this.refs.textInput.getValue());
  },

  handleClickCancel(event) {
    event.preventDefault();
    this.setState({ edit: false });
  },

  renderShow() {
    return (
      <tr>
        <td onDoubleClick={this.handleClickEdit}>
          {this.props.category.name}
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
            <TextInput
              ref="textInput"
              defaultValue={this.props.category.name}
              onEnter={this.updateCategory}/>
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
    this.refs.textInput.setValue('');
  },

  renderHeading() {
    if (this.data.categories.length == 0) {
      return (
        <tr>
          <th colSpan="4">Category</th>
        </tr>
      );
    }
    return (
      <tr>
        <th className="fourteen wide">Category</th>
        <th className="two wide">Words</th>
        <th colSpan="2">Actions</th>
      </tr>
    );
  },

  renderCategories() {
    if (this.data.categories.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No word categories added.</td>
        </tr>
      );
    }
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
            {this.renderHeading()}
          </thead>
          <tbody>
            {this.renderCategories()}
          </tbody>
        </table>
      </div>
    );
  }
});
