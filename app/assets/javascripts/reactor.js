'use strict';

import {Reactor} from 'nuclear-js';
import TasksStore from 'tasks_store';

let reactor = new Reactor({
  debug: true
});

reactor.registerStores({
  tasks: TasksStore
});

export default reactor;