const request = require('supertest');
const app = require('server.js');

describe('Testing Root Path', () => {
  test('It should respond to GET method', (done) => {
    request(app).get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});
