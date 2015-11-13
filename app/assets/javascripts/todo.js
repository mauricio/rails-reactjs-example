'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Immutable = require("immutable");
var IsEmpty = require('lodash/lang/isEmpty');

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

var TaskList = React.createClass({

  getInitialState() {
    return {
      newItem: "",
      count: 0,
      selectedItems: Immutable.Set()
    };
  },

  textChanged(event) {
    this.setState({newItem: event.target.value});
  },

  itemSelected(item) {
    this.setState({selectedItems: this.state.selectedItems.add(item)});
  },

  itemDeselected(item) {
    this.setState({selectedItems: this.state.selectedItems.remove(item)});
  },

  add() {
    if (IsEmpty(this.state.newItem)) {
      alert("You have to type something!");
    } else {
      this.setState({
        newItem: "",
        count: this.state.count + 1,
        items: this.state.items.add(this.state.newItem)
      });
    }
  },

  removeSelected(){
    this.setState({
      selectedItems: Immutable.Set(),
      items: this.state.items.subtract(this.state.selectedItems)
    });
  },

  render() {

    var lines = this.state.items.map((item) => {
      return <Task
          key={item}
          name={item}
          itemSelected={this.itemSelected}
          itemDeselected={this.itemDeselected}/>;
    });

    return <div>
      <h1>To-do</h1>
      <p>
        <input key={`form-${this.state.count}`} type="text" onChange={this.textChanged}/>
        <button onClick={this.add} disabled={IsEmpty(this.state.newItem)}>Add new</button>
        <button onClick={this.removeSelected}>Remove Selected</button>
      </p>
      <ul>
        {lines}
      </ul>
    </div>;
  }

});

ReactDOM.render(
    <TaskList />,
    document.getElementById('flux-app')
);