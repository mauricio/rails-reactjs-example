'use strict';

import ActionTypes from "action_types";
import reactor from "reactor";
import request from 'superagent';

function setup(request, success, error) {
  return request
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err && error) {
          error(err);
        } else {
          success(res.text && JSON.parse(res.text));
        }
      });
}


var actions = {

  addTask(task) {
    setup(
        request
            .post("/tasks")
            .type("application/json")
            .send({task: {name: task}}),
        () => {
          reactor.dispatch(ActionTypes.ADD_TASK_SUCCESS, task);
        },
        (err) => {
          reactor.dispatch(ActionTypes.ADD_TASK_FAILURE, err);
        }
    );
  },

  deleteTasks(tasks) {
    setup(
        request
            .delete("/tasks/delete_all")
            .type("application/json")
            .send({tasks: tasks}),
        (tasks) => {
          reactor.dispatch(ActionTypes.DELETE_TASKS_SUCCESS, tasks);
        },
        (err) => {
          reactor.dispatch(ActionTypes.DELETE_TASKS_FAILURE, err);
        }
    );
  },

  loadTasks() {
    setup(
        request.get("/tasks"),
        (tasks) => {
          reactor.dispatch(ActionTypes.LOAD_TASKS_SUCCESS, tasks);
        },
        (err) => {
          reactor.dispatch(ActionTypes.LOAD_TASKS_FAILURE, err);
        }
    );
  }

};


export default actions;