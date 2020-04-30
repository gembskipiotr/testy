const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (req, user) => { 
  const ACCESS_TOKEN = jwt.sign({ 
      id: user._id,
    },
    config.JwtSecret,
  );
  return ACCESS_TOKEN;
};

const verifyToken = (req, res, next) => { 
  if (!req.headers.authorization) { 
    return res.status(401).send({ 
      error: 'Token is missing' 
    }); 
  } 

  const BEARER = 'Bearer';
  const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ') 
  if (AUTHORIZATION_TOKEN[0] !== BEARER) { 
    return res.status(401).send({ 
      error: 'Token is not complete',
    }) 
  }

  try {
    const verified = jwt.verify(AUTHORIZATION_TOKEN[1], config.JwtSecret);
    res.currentUserId = verified.id;
    next(); 
  } catch (error) {
    if (error) { 
      return res.status(401).send({ 
        error: 'Token is invalid',
      }); 
    } 
  }
}; 

module.exports = {
  verifyToken,
  generateToken,
};
