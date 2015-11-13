'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App  = React.createClass({

  render() {
    return <div>I am a component.</div>;
  }

});

/*
var App = React.createClass({

  getInitialState() {
    return {
      text: ""
    };
  },

  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  handleChange(event) {
    this.setState({text: event.target.value});
  },

  render() {

    return (
        <div>
          <h1>{this.props.title}</h1>
          <p>
            From: <input
              type="text" onChange={this.handleChange}/>
            to here:
            <input
                type="text" value={this.state.text}/>
          </p>
        </div>
    );
  }

});
*/

ReactDOM.render(
    <App title="ReactJS example"/>,
    document.getElementById('flux-app')
);
