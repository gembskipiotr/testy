import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { pipe, prop, equals, complement } from 'ramda';

export const { Types: TasksTypes, Creators: TasksActions } = createActions(
  {
    createTask: ['task', 'onFinish'],
    createTaskSuccess: ['task'],
    updateTask: ['taskId', 'task', 'onFinish'],
    updateTaskSuccess: ['task'],
    removeTask: ['taskId'],
    removeTaskSuccess: ['taskId'],
    getTasks: [],
    getTasksSuccess: ['tasks'],
  },
  { prefix: 'TASKS/' }
);

export const INITIAL_STATE = new Immutable({
  tasksList: [],
});

export const createTaskSuccess = (state, { task }) => {
  return state.set('tasksList', Immutable(state.tasksList.concat(task)));
};

export const removeTaskSuccess = (state, { taskId }) => {
  const hasId = pipe(prop('_id'), equals(taskId));
  return state.set('tasksList', state.tasksList.filter(complement(hasId)));
};

export const updateTaskSuccess = (state, { task }) => {
  const hasId = pipe(prop('_id'), equals(task._id));
  const taskIndex = state.tasksList.findIndex(hasId);
  return state.set('tasksList', state.tasksList.map((taskItem, index) => {
    if (index === taskIndex) {
      return task;
    }
    return taskItem;
  }));
};

export const getTasksSuccess = (state, { tasks }) => {
  return INITIAL_STATE.set('tasksList', Immutable(tasks));
};

export const reducer = createReducer(INITIAL_STATE, {
  [TasksTypes.CREATE_TASK_SUCCESS]: createTaskSuccess,
  [TasksTypes.REMOVE_TASK_SUCCESS]: removeTaskSuccess,
  [TasksTypes.UPDATE_TASK_SUCCESS]: updateTaskSuccess,
  [TasksTypes.GET_TASKS_SUCCESS]: getTasksSuccess,
});
