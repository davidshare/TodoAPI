import request from 'supertest';
import app from '../../server';
import {
  API_PREFIX,
  ADD_NOTE_SUCCESS,
  REQUIRED_TITLE,
  INVALID_TOKEN,
  GET_NOTE_SUCCESS,
  NOTES_NOT_FOUND,
  NOTE_NOT_FOUND,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  INVALID_NOTE_TYPE
} from '../../helpers/constants';
import {userSeeds, noteSeeds } from '../../database/seeders';

describe('Test the create notes endpoint', () => {
  let userToken;
  beforeAll( async(done) => {
    const response = await request(app)
    .post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user6);
    userToken = response.body.payload;
    done();
  });

  it('should return not found if no note has been created', async(done) => {
    const response = await request(app).get(`${API_PREFIX}notes`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(NOTES_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should create a note successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}notes`)
    .send(noteSeeds.note1)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(ADD_NOTE_SUCCESS);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should return an error for an invalid note type', async(done) => {
    const response = await request(app).post(`${API_PREFIX}notes`)
    .send(noteSeeds.note5)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(INVALID_NOTE_TYPE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a note without title', async(done) => {
    const response = await request(app).post(`${API_PREFIX}notes`)
    .send(noteSeeds.note2)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(REQUIRED_TITLE);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a note without logging in', async(done) => {
    const response = await request(app).post(`${API_PREFIX}notes`)
    .send(noteSeeds.note2);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should get all notes', async(done) => {
    const response = await request(app).get(`${API_PREFIX}notes`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(GET_NOTE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not get all notes without logging in', async(done) => {
    const response = await request(app).get(`${API_PREFIX}notes`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should get a note by Id', async(done) => {
    const response = await request(app).get(`${API_PREFIX}notes/1`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(GET_NOTE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should return not found if a note with id is not found', async(done) => {
    const response = await request(app).get(`${API_PREFIX}notes/2`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(NOTE_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error for invalid id', async(done) => {
    const response = await request(app).get(`${API_PREFIX}notes/e`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(500);
    done();
  });

  it('should update a note successfully', async(done) => {
    noteSeeds.note1.title ='Updating this title';
    const response = await request(app).put(`${API_PREFIX}notes/1`)
    .send(noteSeeds.note1)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(UPDATE_NOTE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not update a note without a token', async(done) => {
    noteSeeds.note1.title ='Updating this title';
    const response = await request(app).put(`${API_PREFIX}notes/1`)
    .send(noteSeeds.note1);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return not found if the note does not exist', async(done) => {
    noteSeeds.note1.title ='Updating this title';
    const response = await request(app).put(`${API_PREFIX}notes/2`)
    .send(noteSeeds.note1)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(NOTE_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error for invalid id for update', async(done) => {
    const response = await request(app).put(`${API_PREFIX}notes/e`)
    .set('Authorization', `Bearer ${userToken}`)
    .send(noteSeeds.note1);
    expect(response.status).toBe(500);
    done();
  });

  it('should not delete a note without a token', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}notes/1`);
    expect(response.body.message).toBe(INVALID_TOKEN);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not delete a note that doesnt exist', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}notes/2`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(NOTE_NOT_FOUND);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should return an error for invalid id for delete', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}notes/e`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(500);
    done();
  });

  it('should delete a note ', async(done) => {
    const response = await request(app).delete(`${API_PREFIX}notes/1`)
    .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.message).toBe(DELETE_NOTE_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });
});
