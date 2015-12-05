App = React.createClass({
  render() {
    return (
      <div className="app">
        <Menu/>
        <div className="ui container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
