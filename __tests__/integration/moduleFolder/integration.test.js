import request from 'supertest';
import app from '../../../src/app';

describe('Testing integration tests with tests', () => {
  it('should be able to test jest', async () => {
    const response = await request(app).get('/example/');

    expect(response.body).toEqual({ hello: 'world' });
  });
});
