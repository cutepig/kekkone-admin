const { Link } = ReactRouter;

/**
 * ------------------------------------------------------------------------
 * Category row component
 * ------------------------------------------------------------------------
 */

CategoryRow = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    category: React.PropTypes.object.isRequired
  },

  getMeteorData() {
    let categoryId = this.props.category._id;
    let handle = Meteor.subscribe('words', categoryId);

    return {
      countLoading: !handle.ready(),
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
          {this.props.category.name}
        </td>
        <td className="selectable">
          <Link to={`/vocabulary/${this.props.category.name}`}>
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
              defaultValue={this.props.category.name}
              onEnter={this.updateCategory}/>
          </div>
        </td>
        <td className="selectable">
          <Link to={`/vocabulary/${this.props.category.name}`}>
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
 * Category table component
 * ------------------------------------------------------------------------
 */

CategoryTable = React.createClass({
  propTypes: {
    categories: React.PropTypes.array.isRequired
  },

  addCategory(category) {
    Meteor.call('addCategory', category);
    this.refs.textInput.setValue('');
  },

  renderHead() {
    if (this.props.categories.length == 0) {
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

  renderRows() {
    if (this.props.categories.length == 0) {
      return (
        <tr className="disabled">
          <td colSpan="3">No word categories added.</td>
        </tr>
      );
    }
    return this.props.categories.map((category) => {
      return <CategoryRow key={category._id} category={category}/>;
    });
  },

  render() {
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
