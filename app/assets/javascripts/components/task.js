import React from "react";

var Task = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    itemSelected: React.PropTypes.func.isRequired,
    itemDeselected: React.PropTypes.func.isRequired
  },

  clicked(event) {
    if (event.target.checked) {
      this.props.itemSelected(this.props.name);
    } else {
      this.props.itemDeselected(this.props.name);
    }
  },

  render() {
    return <li>
      {this.props.name}
      <input type="checkbox" onChange={this.clicked}/>
    </li>;
  }

});

export default Task;