import request from 'supertest';
import app from '../../server';
import {
  API_PREFIX,
  ADD_TODO_SUCCESS,
  REQUIRED_TITLE,
  INVALID_TOKEN,
  GET_TODO_SUCCESS,
  TODOS_NOT_FOUND,
  TODO_NOT_FOUND,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  INVALID_TITLE
} from '../../helpers/constants';
import {userSeeds, todoSeeds } from '../../database/seeders';

describe('Test the create todos endpoint', () => {
  let userToken;
  beforeAll( async(done) => {
    const response = await request(app)
    .post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user7);
    userToken = response.body.payload;
    done();
  });

  it('should return not found if no todo has been created', async(done) => {
    const response = await request(app).get(`${API_PREFIX}todos`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(TODOS_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
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

  it('should not create a todo if the title is invalid', async(done) => {
    const response = await request(app).post(`${API_PREFIX}todos`)
    .send(todoSeeds.todo3)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_TITLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
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

  it('should not get all todos without logging in', async(done) => {
    const response = await request(app).get(`${API_PREFIX}todos`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not get a todo by Id', async(done) => {
    const response = await request(app).get(`${API_PREFIX}todos/1`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(GET_TODO_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should return not found if a todo with id is not found', async(done) => {
    const response = await request(app).get(`${API_PREFIX}todos/2`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(TODO_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error for invalid id', async(done) => {
    const response = await request(app).get(`${API_PREFIX}todos/e`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(500);
    done();
  });

  it('should update a todo successfully', async(done) => {
    todoSeeds.todo1.title ='Updating this title';
    const response = await request(app).put(`${API_PREFIX}todos/1`)
    .send(todoSeeds.todo1)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(UPDATE_TODO_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not update a todo without a token', async(done) => {
    todoSeeds.todo1.title ='Updating this title';
    const response = await request(app).put(`${API_PREFIX}todos/1`)
    .send(todoSeeds.todo1);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return not found if the todo does not exist', async(done) => {
    todoSeeds.todo1.title ='Updating this title';
    const response = await request(app).put(`${API_PREFIX}todos/2`)
    .send(todoSeeds.todo1)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(TODO_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error for invalid id for update', async(done) => {
    const response = await request(app).put(`${API_PREFIX}todos/e`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(500);
    done();
  });

  it('should not delete a todo without a token', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}todos/1`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not delete a todo that doesnt exist', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}todos/2`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(TODO_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error for invalid id for delete', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}todos/e`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(500);
    done();
  });

  it('should delete a todo ', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}todos/1`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(DELETE_TODO_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });
});
