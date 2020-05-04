var app = require('../app')
var request = require('supertest')
var expect = require('chai').expect
let should = require('chai').should

let token;

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
      token = res.body.token;
      done()
    })
  })
})

describe('Logout',()=>{
  it('Correct logout, expect status code to be equal 200', (done)=>{
    request(app)
    .post('/api/logout')
    .set({ Authorization: token })
    .expect(200,done)
  })
})
