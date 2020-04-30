const Notification = require('../models/notification');
const { verifyToken } = require('../middleware/jwt');

const getList = async (request, response) => {
  try {
    const list = await Notification.find({ userId: response.currentUserId }).sort([['_id', -1]]);
    response.status(200).send(list);
  } catch (error) {
    response.status(501).send(error);
  }
}

const deleteNotification = async (request, response) => {
  try {
    await Notification.findByIdAndDelete(request.params.notificationId);
    response.status(200).send();
  } catch (error) {
    response.status(501).send();
  }
}

const markAsRead = async (request, response) => {
  try {
    const notification = await Notification.findById(request.params.notificationId);
    await notification.update({ read: true });
    response.json(true);
  } catch (error) {
    response.status(501).send(error);
  }
}

module.exports = (app) => {
  app.get('/api/notifications', verifyToken, getList);
  app.delete('/api/notifications/:notificationId', verifyToken, deleteNotification);
  app.post('/api/notifications/:notificationId/read', verifyToken, markAsRead);
}