'use strict';

import Immutable from 'immutable';
import {Store, toImmutable} from 'nuclear-js';
import ActionTypes from 'action_types';

function returnAll(original, current) {
  return toImmutable(current).map((i) => {
    return i.get("name");
  });
}

const TasksStore = Store({

  getInitialState() {
    return Immutable.Set();
  },

  initialize() {
    this.on(ActionTypes.ADD_TASK_SUCCESS, (original, task) => {
      return original.add(task["name"]);
    });

    this.on(ActionTypes.DELETE_TASKS_SUCCESS, returnAll);
    this.on(ActionTypes.LOAD_TASKS_SUCCESS, returnAll);
  }

});

export default TasksStore;