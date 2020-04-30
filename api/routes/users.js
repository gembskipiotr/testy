const User = require('../models/user');
const { verifyToken } = require('../middleware/jwt');

const createUser = async (request, response) => {
  try {
    await (new User(request.body)).save();
    response.status(204);
  } catch (error) {
    response.status();
  }
}

module.exports = (app) => {
  app.post('/users', verifyToken, createUser);
}