const { Link } = ReactRouter;

LabeledText = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render() {
    let parts = this.props.text.split(/(\{[\wäÄöÖ]+\})/gi);

    for (let i = 1; i < parts.length; i += 2) {
      let category = parts[i].replace(/[\{\}]/g, '');

      parts[i] = (
        <Link
          className="ui label"
          key={i}
          to={`/vocabulary/${category}`}>
          {category}
        </Link>
      );
    }

    return <div>{parts}</div>;
  }
});
