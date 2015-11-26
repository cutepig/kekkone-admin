App = React.createClass({
  render() {
    return (
      <div>
        <Menu/>
        <div className="ui container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
