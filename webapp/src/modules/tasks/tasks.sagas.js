import { all, put, takeLatest, select } from 'redux-saga/effects';
import reportError from '../../shared/utils/reportError';
import { api } from '../../shared/services/api';

import { selectUserId } from '../auth/auth.selectors';
import { LANES_TYPES } from './tasks.contants';
import { TasksTypes, TasksActions } from './tasks.redux';

function* getTasks() {
  try {
    const { data } = yield api.get('/tasks');
    yield put(TasksActions.getTasksSuccess(data));
  } catch (error) {
    reportError(error);
  }
}

function* createTask({ task, onFinish }) {
  try {
    const userId = yield select(selectUserId);
    task.creatorId = userId;
    task.status = LANES_TYPES.OPEN;
    const { data } = yield api.post('/tasks', task);
    yield put(TasksActions.createTaskSuccess(data));
    onFinish();
  } catch (error) {
    reportError(error);
  }
}

function* removeTask({ taskId }) {
  try {
    yield api.delete(`/tasks/${taskId}`);
    yield put(TasksActions.removeTaskSuccess(taskId));
  } catch (error) {
    reportError(error);
  }
}

function* updateTask({ taskId, task, onFinish = Function.prototype }) {
  try {
    const { data } = yield api.put(`/tasks/${taskId}`, task);
    yield put(TasksActions.updateTaskSuccess(data));
    onFinish();
  } catch (error) {
    reportError(error);
  }
}

export function* watchTasks() {
  yield all([
    takeLatest(TasksTypes.GET_TASKS, getTasks),
    takeLatest(TasksTypes.CREATE_TASK, createTask),
    takeLatest(TasksTypes.REMOVE_TASK, removeTask),
    takeLatest(TasksTypes.UPDATE_TASK, updateTask),
  ]);
}
