const { Link, History } = ReactRouter;

MenuLink = React.createClass({
  mixins: [History],

  render() {
    let isActive = this.history.isActive(this.props.to, this.props.query);
    let className = isActive ? 'active item' : 'item';

    return (
      <Link to={this.props.to} className={className}>
        {this.props.children}
      </Link>
    );
  }
});

Menu = React.createClass({
  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <Link className="header item" to="/">Kekkone Admin</Link>
          <MenuLink to="/vocabulary">Vocabulary</MenuLink>
          <MenuLink to="/phrases">Phrases</MenuLink>
          <MenuLink to="/keywords">Keywords</MenuLink>
        </div>
      </div>
    );
  }
});
