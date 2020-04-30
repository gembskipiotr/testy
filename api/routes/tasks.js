const { pick } = require('lodash');
const { verifyToken } = require('../middleware/jwt');
const Task = require('../models/task');
const Notification = require('../models/notification');

const STATUS = {
  open: 'Zgłoszone',
  in_progress: 'W trakcie',
  done: 'Zakończone',
};

const createTask = async (request, response) => {
  try {
    const task = await (new Task(request.body)).save();
    const taskWithDetails = await Task.getTaskWithDetails(task._id);
    await Notification.sendNotification(
      request.body.creatorId,
      request.body.userId,
      `przypisał Cię do zadania "${task.name}".`,
    );
    response.json(taskWithDetails);
  } catch (error) {
    response.status(501).send(error);
  }
}

const getList = async (request, response) => {
  try {
    const list = await Task.find();
    const extendedList = await Promise.all(list.map((task) => Task.getTaskWithDetails(task._id)))
    response.status(200).send(extendedList);
  } catch (error) {
    response.status(501).send(error);
  }
}

const deleteTask = async (request, response) => {
  try {
    await Task.findByIdAndDelete(request.params.taskId);
    response.status(200).send();
  } catch (error) {
    response.status(501).send();
  }
}

const updateTask = async (request, response) => {
  try {
    const task = await Task.findById(request.params.taskId);

    await task.update(pick(request.body, ['userId', 'endTime', 'status', 'name', 'description']));
    const updatedTask = await Task.getTaskWithDetails(request.params.taskId);

    if (response.currentUserId === task.creatorId) {
      await Notification.sendNotification(
        response.currentUserId,
        task.userId,
        `zaktualizował zadanie "${task.name}".`,
      );
    }
    if (response.currentUserId !== task.creatorId && request.body.status) {
      let message = `zmienił status zadania zadania "${task.name}" na ${STATUS[request.body.status]}`
      if (request.body.status === 'done' && (new Date(task.endTime) < Date.now())) {
        message += ' po planowanym terminie';
      } 
      await Notification.sendNotification(
        response.currentUserId,
        task.creatorId,
        `${message}.`,
      );
    }
    response.json(updatedTask);
  } catch (error) {
    response.status(501).send(error);
  }
}

module.exports = (app) => {
  app.post('/api/tasks', verifyToken, createTask);
  app.delete('/api/tasks/:taskId', verifyToken, deleteTask);
  app.get('/api/tasks', verifyToken, getList);
  app.put('/api/tasks/:taskId', verifyToken, updateTask);
}