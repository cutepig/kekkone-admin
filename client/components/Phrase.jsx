Phrase = React.createClass({
  propTypes: {
    phrase: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <tr>
        <td>
          {this.props.phrase.text}
        </td>
        <td className="selectable collapsing">
          <a href="#">
            <i className="edit icon"></i>
          </a>
        </td>
        <td className="selectable collapsing">
          <a href="#">
            <i className="trash icon"></i>
          </a>
        </td>
      </tr>
    );
  }
});
