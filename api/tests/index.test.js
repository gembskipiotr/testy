var app = require('../app')
var request = require('supertest')
var expect = require('chai').expect
let should = require('chai').should

let token = 'Bearer ';
let tokenSecond = 'Bearer ';
let userId;
let creatorId;
let companyId;
let taskId;
let orderId;

describe("Registration", ()=>{
  it('Create new user, expect status code to be equal 204', (done) => {
    request(app)
    .post('/api/register')
    .send({
      name:'Mariuszek',
      lastname:'Nowak',
      email:'Mario123@wp.pl',
      password:'1234'
    })
    .expect(204, done)
  }).timeout(10000);
  it('Create new user with existing in database email, expect  status code to be equal 501 ', (done) => {
    request(app)
    .post('/api/register')
    .send({
      name:'Mariuszek',
      lastname:'Nowak',
      email:'Mario123@wp.pl',
      password:'1234'
    })
    .expect(501, done)
  })
})
describe('Login', ()=>{
  it('Incorrect password, expect status code to be equal 401', (done) => {
    request(app)
    .post('/api/login')
    .send({
      email:'Mario123@wp.pl',
      password: '12345'
    })
    .expect(401,done)
  })
  it('Correct login details, expect status code to be equal 200, json response with user data', (done) => {
    request(app)
    .post('/api/login')
    .send({
      email:'Mario123@wp.pl',
      password: '1234'
    })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('lastname');
      expect(res.body).to.have.property('email');
      expect(res.body).to.have.property('token');
      token += res.body.token;
      creatorId = res.body._id;
      done()
    })
  })

  it('Correct login details secod user, expect status code to be equal 200', (done) => {
    request(app)
    .post('/api/login')
    .send({
      email:'kowal@gmail.com',
      password: '1234'
    })
    .expect(200,(err,res)=>{
      tokenSecond += res.body.token;
      userId = res.body._id;
      done()
    })
  })
})
describe('Company',()=>{

  it('Create new company, expect status code to be equal 200', (done)=>{
    request(app)
    .post('/api/companies')
    .send({
      name:'TestCompaniesName'
    })
    .set({ Authorization: token })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('creatorId');
      expect(res.body.users).to.be.a('array');
      expect(res.body.pendingUsers).to.be.a('array');
      expect(res.body.orders).to.be.a('array');
      companyId = res.body._id;
      done();
    })
  })

  it('Get user company, expect status code to be equal 200',(done)=>{
    request(app)
    .get('/api/companies')
    .set({ Authorization: token })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('object');
      done();
    })
  })

  it('Join the company, expect status code to be equal 204',(done)=>{
    request(app)
    .post(`/api/companies/${companyId}/join`)
    .set({ Authorization: tokenSecond })
    .expect(204,done)
  })

  it('Accept user, expect status code to be equal 204',(done)=>{
    request(app)
    .post(`/api/companies/${companyId}/accept`)
    .set({ Authorization: token })
    .send({
      userId: userId
    })
    .expect(204, done)
  })
})

describe('Orders', ()=>{
  it('Create new order, expect status code to be equal 200', (done)=>{
    request(app)
    .post('/api/orders')
    .set({ Authorization: token })
    .send({
      name: "Order Test",
      users: userId,
    })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body.users).to.be.a('array');
      expect(res.body.tasks).to.be.a('array');
      orderId = res.body._id;
      done()
    })
  })

  it('Get order list, expect status code to be equal 200', (done)=>{
    request(app)
    .get('/api/orders')
    .set({ Authorization: token })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('array');
      done()
    })
  })

  it('Edit order data, expect status code to be equal 200', (done)=>{
    request(app)
    .put(`/api/orders/${orderId}`)
    .set({ Authorization: token })
    .send({
      name: "Order",
      users: userId,
    })
    .expect(200,done)
  })
})

describe('Tasks', ()=>{
  it('Create new task, expect status code to be equal 200', (done)=>{
    request(app)
    .post('/api/tasks')
    .set({ Authorization: token })
    .send({
      name: "Test task",
      orderId: orderId,
      creatorId: creatorId,
      endTime: Date.now(),
      userId: userId,
      description: "testowy opis",
    })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('endTime');
      expect(res.body).to.have.property('orderId');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('userName');
      taskId = res.body._id;
      done();
    })
  })

  it('Get task list, expect status code to be equal 200',(done)=>{
    request(app)
    .get('/api/tasks')
    .set({ Authorization: token })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.be.a('object');
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('endTime');
      expect(res.body[0]).to.have.property('orderId');
      expect(res.body[0]).to.have.property('userId');
      expect(res.body[0]).to.have.property('description');
      expect(res.body[0]).to.have.property('userName');
      done()
    })
  })

  it('Edit task data, expect status code to be equal 200', (done)=>{
    request(app)
    .put(`/api/tasks/${taskId}`)
    .set({ Authorization: token })
    .send({
      name: "Edit test task",
      orderId: orderId,
      creatorId: creatorId,
      endTime: Date.now(),
      userId: userId,
      description: "edycja testowego opisu",
    })
    .expect(200,done)
  })

})

describe('Notifications', ()=>{
  it('Get notifications list, expect status code to be equal 200', (done)=>{
    request(app)
    .get('/api/notifications')
    .set({ Authorization: token })
    .expect(200,(err,res)=>{
      expect(res.body).to.be.a('array');
      done()
    })
  })
})

describe('Logout',()=>{

  it('Remove task, expect status code to be equal 200', (done)=>{
    request(app)
    .delete(`/api/tasks/${taskId}`)
    .set({ Authorization: token })
    .expect(200,done)
  })

  it('Remove order, expect status code to be equal 200', (done)=>{
    request(app)
    .delete(`/api/orders/${orderId}`)
    .set({ Authorization: token })
    .expect(200,done)
  })

  it('Leave company, expect status code to be equal 200',(done)=>{
    request(app)
    .delete(`/api/companies/${companyId}/${userId}`)
    .set({ Authorization: tokenSecond })
    .expect(200, done)
  })

  it('Correct logout, expect status code to be equal 200', (done)=>{
    request(app)
    .post('/api/logout')
    .set({ Authorization: token })
    .expect(200,done)
    token = 'Bearer ';
  })
  it('Correct logout secod user, expect status code to be equal 200', (done)=>{
    request(app)
    .post('/api/logout')
    .set({ Authorization: tokenSecond })
    .expect(200,done)
    tokenSecond = 'Bearer ';
  })
})
