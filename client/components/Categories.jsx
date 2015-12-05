Category = React.createClass({
  propTypes: {
    category: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { edit: false }
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
    CategoriesCollection.update(this.props.category._id, {
      $set: { text: this.refs.textInput.value.trim() }
    });
  },

  deleteCategory() {
    CategoriesCollection.remove(this.props.category._id);
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
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickEdit}>
            <i className="edit icon"/>
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickDelete}>
            <i className="trash icon"/>
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
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickSave}>
            <i className="save icon"/>
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#" onClick={this.handleClickCancel}>
            <i className="cancel icon"/>
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
    return {
      categories: CategoriesCollection.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  componentDidMount() {
    this.refs.textInput.focus();
  },

  handleInput(event) {
    if (event.keyCode == 13) {
      let textInput = ReactDOM.findDOMNode(this.refs.textInput);
      CategoriesCollection.insert({
        text: textInput.value.trim(),
        createdAt: new Date()
      });
      textInput.value = '';
    }
  },

  renderCategories() {
    return this.data.categories.map((category) => {
      return <Category key={category._id} category={category}/>;
    });
  },

  render() {
    return (
      <div>
        <div className="ui fluid input">
          <input
            type="text"
            ref="textInput"
            placeholder="Type a new category"
            onKeyUp={this.handleInput}/>
        </div>
        <table className="ui table">
          <thead>
            <tr>
              <th>Category</th>
              <th></th>
              <th></th>
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
