import request from 'supertest';
import app from '../server';

describe('Test the root route', () => {
  it('should return a status code of 200', async(done) => {
    const response = await request(app).get('/');
    expect(response.body.message).toBe('Welcome to the Todo API');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });
});
