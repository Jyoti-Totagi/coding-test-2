const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - user', () => 
{
  it('should fail to create a user without a name', async () => {
    const res = await request(app).post('/users').send({
      age: 16,
      color: 'gamer',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should fail to create a user without a age', async () => {
    const res = await request(app).post('/users').send({
      name: 'sinchan',
      color: 'gamer',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"age" is required');
  });

  it('should fail to create a user without a color', async () => {
    const res = await request(app).post('/users').send({
      name:'sinchan',
      age: 16,
     
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"color" is required');
  });

  it('should create a user', async () => {
    const user = {
      name: 'Smith',
      age: 16,
      color: 'gamer',
    };
    const res = await request(app).post('/users').send(user);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(user.name);
    expect(res.body.age).to.equal(user.age);
    expect(res.body.color).to.equal(user.color);
  });
});