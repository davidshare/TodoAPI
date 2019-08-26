import request from 'supertest';
import app from '../../server';
import {
  API_PREFIX,
  ADD_TODO_SUCCESS,
  REQUIRED_TITLE,
  INVALID_TOKEN,
  GET_TODO_SUCCESS
} from '../../helpers/constants';
import {userSeeds, todoSeeds } from '../../database/seeders';

describe('Test the create todos endpoint', () => {
  let userToken;
  beforeAll( async(done) => {
    const response = await request(app)
    .post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user6);
    userToken = response.body.payload;
    done();
  });

  it('should create a todo successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}todos`)
    .send(todoSeeds.todo1)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(ADD_TODO_SUCCESS);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not create a todo without title', async(done) => {
    const response = await request(app).post(`${API_PREFIX}todos`)
    .send(todoSeeds.todo2)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(REQUIRED_TITLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a todo without logging in', async(done) => {
    const response = await request(app).post(`${API_PREFIX}todos`)
    .send(todoSeeds.todo2);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should all todos', async(done) => {
    const response = await request(app).get(`${API_PREFIX}todos`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(GET_TODO_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

});
