const Company = require('../models/company');
const { verifyToken } = require('../middleware/jwt');

const getInitialData = async (request, response) => {
  try {
    const initialData = await Company.findInitialData(response.currentUserId);
    response.status(200).send(initialData); 
  } catch (error) {
    response.status(501).send(error);
  }
}

const createCompany = async (request, response) => {
  try {
    await (new Company({
      name: request.body.name,
      creatorId: response.currentUserId,
    })).save();
    const companyData = await Company.findInitialData(response.currentUserId);
    response.json(companyData);
  } catch (error) {
    response.status(501).send;
  }
}

const joinCompany = async (request, response) => {
  try {
    await Company.update(
      { _id: request.params.companyId },
      { $push: { pendingUsers: response.currentUserId } },
    );

    const companyData = await Company.findInitialData(response.currentUserId);
    response.status(204).send(companyData);
  } catch (error) {
    response.status(501).send;
  }
}

const acceptMembership = async (request, response) => {
  try {
    await Company.update(
      { _id: request.params.companyId },
      { 
        $push: {
          users: request.body.userId
        },
        $pull: {
          pendingUsers: request.body.userId
        }
      },
    );
    response.status(204).send();
  } catch (error) {
    response.status(501).send;
  }
}

const leave = async (request, response) => {
  try {
    await Company.update(
      { _id: request.params.companyId },
      { 
        $pull: {
          pendingUsers: request.params.userId,
          users: request.params.userId,
        }
      },
    );

    response.status(200).send();
  } catch (error) {
    response.status(501).send;
  }
}

module.exports = (app) => {
  app.post('/api/companies', verifyToken, createCompany);
  app.get('/api/companies', verifyToken, getInitialData);
  app.post('/api/companies/:companyId/join', verifyToken, joinCompany);
  app.post('/api/companies/:companyId/accept', verifyToken, acceptMembership);
  app.delete('/api/companies/:companyId/:userId', verifyToken, leave);
}