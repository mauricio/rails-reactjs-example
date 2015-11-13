'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Immutable = require("immutable");
var IsEmpty = require('lodash/lang/isEmpty');
var Task = require('components/task');
var Reactor = require('reactor');
var getters = require('getters');
var Actions = require('actions');

var TaskList = React.createClass({
  mixins: [Reactor.ReactMixin],

  getInitialState() {
    return {
      newItem: "",
      count: 0,
      selectedItems: Immutable.Set()
    };
  },

  componentDidMount() {
    Actions.loadTasks();
  },

  getDataBindings() {
    return {tasks: getters.tasks};
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
      Actions.addTask(this.state.newItem);
      this.setState({
        newItem: "",
        count: this.state.count + 1
      });
    }
  },

  removeSelected() {
    Actions.removeTasks(this.state.selectedItems);
    this.setState({
      selectedItems: Immutable.Set()
    });
  },

  render() {

    var lines = this.state.tasks.map((item) => {
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