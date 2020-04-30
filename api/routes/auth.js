const User = require('../models/user');
const { generateToken } = require('../middleware/jwt');

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.authenticate(email, password);
    if (user) {
      response.status(200).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        token: generateToken(request, user),
      });
    } else {
      throw new Error('User doesn\'t exist');
    }
  } catch (error) {
    response.status(401).send(error);
  }
}

const logout = (request, response) => {
  response.header('authorization', '').sendStatus(200);
}

const register = async (request, response) => {
  try {
    await (new User({
      name: request.body.name,
      lastname: request.body.lastname,
      password: request.body.password,
      email: request.body.email,
    })).save();
    response.status(204).send();
  } catch (error) {
    response.status(501).send(error);
  }
}

module.exports = (app) => {
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
}