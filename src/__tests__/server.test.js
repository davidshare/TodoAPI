import request from 'supertest';
import app from '../server';

describe('Test the root route', () => {
  it('should return a status code of 200', async () => {
		const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return a body in the response', async () => {
		const response = await request(app).get('/');
    expect(response.body).toBe('Welcome to MindMirror');
  });
});

describe('Database connection', () => {
  it('should return a status code of 200', async () => {
		const response = await request(app).get('/now');
    expect(response.status).toBe(200);
  });
});
