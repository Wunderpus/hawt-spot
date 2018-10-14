const request = require('supertest');

const db = require('./db.js');
const server = require('./server.js');

// Declare a test user for registration testing
const testUser = {
  loginMethod: 'Registration',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@doe.com',
  password: 'S3cretP@ss',
  token: '',
};

// Declare a test user for deletion testing
const deleteUser = {
  email: 'jane@doe.com',
};

// Close database and server once testing is complete
afterAll(async () => {
  server.close();
  await db.end();
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 0);
  });
});

// Testing - Root Path
describe('Server Test - GET /', () => {
  test('It should respond to GET method', (done) => {
    request(server).get('/').then((response) => {
      expect(response).toBeDefined();
      done();
    });
  });
  test('Response should have Status 200', (done) => {
    request(server).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

// Testing - User Routes / Test Path
describe('Server Test - GET /users/test ', () => {
  test('It should respond to GET method', (done) => {
    request(server).get('/users/test').then((response) => {
      expect(response).toBeDefined();
      done();
    });
  });
  test('Response should have Status 200', (done) => {
    request(server).get('/users/test').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Response should include a success object', (done) => {
    request(server).get('/users/test').then((response) => {
      expect(response.body).toEqual({ message: 'Test route successful' });
      done();
    });
  });
});

// Testing - User Routes / Registration Path
describe('Server Test - POST /users/register', () => {
  test('It should respond to POST method with Status 200', (done) => {
    request(server).post('/users/register').then((response) => {
      expect(response).toBeDefined();
      done();
    });
  });
  test('If nothing passed in - response should have Status 500', (done) => {
    request(server).post('/users/register').then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    });
  });
  test('If filled in req.body object passed in - response should have Status 200', (done) => {
    request(server).post('/users/register')
      .set('Accept', 'application/json')
      .send(testUser)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Welcome to HawtSpot!' });
        done();
      });
  });
  test('If the same user is sent twice - response should have Status 500', (done) => {
    request(server).post('/users/register')
      .set('Accept', 'application/json')
      .send(testUser)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBeDefined();
        done();
      });
  });
});

// Testing - User Routes / Deletion Path
describe('Server Test - DELETE /users/', () => {
  test('It should respond to DELETE method with Status 200', (done) => {
    request(server).delete('/users/')
      .set('Accept', 'application/json')
      .send(deleteUser)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
    });
  });
  test('If nothing passed in - response should have Status 500', (done) => {
    request(server).delete('/users/').then((response) => {
      expect(response.statusCode).toBe(500);
      done();
    });
  });
  test('If a user is deleted, a second DELETE returns Status 500', (done) => {
    request(server).delete('/users/')
      .set('Accept', 'application/json')
      .send(deleteUser)
      .then((response) => {
        expect(response.statusCode).toBe(500);
        db.end();
        done();
      });
  });
});
