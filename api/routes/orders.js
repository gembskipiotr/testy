const Order = require('../models/order');
const { verifyToken } = require('../middleware/jwt');

const createOrder = async (request, response) => {
  try {
    const order = await (new Order(request.body)).save();
    response.json(order);
  } catch (error) {
    response.status(501).send(error);
  }
}

const getList = async (request, response) => {
  try {
    const list = await Order.find({
      $or: [
        { creatorId: response.currentUserId },
        { users: response.currentUserId }
      ]
    });
    response.status(200).send(list);
  } catch (error) {
    response.status(501).send(error);
  }
}

const deleteOrder = async (request, response) => {
  try {
    await Order.findByIdAndDelete(request.params.orderId);
    response.status(200).send();
  } catch (error) {
    response.status(501).send();
  }
}

const updateOrder = async (request, response) => {
  try {
    const order = await Order.findById(request.params.orderId);
    await order.update({
      users: request.body.users,
      name: request.body.name,
    });
    const updatedOrder = await Order.findById(request.params.orderId);
    response.json(updatedOrder);
  } catch (error) {
    response.status(501).send();
  }
}

module.exports = (app) => {
  app.post('/api/orders', verifyToken, createOrder);
  app.get('/api/orders', verifyToken, getList);
  app.delete('/api/orders/:orderId', verifyToken, deleteOrder);
  app.put('/api/orders/:orderId', verifyToken, updateOrder);
}