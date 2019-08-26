import request from 'supertest';
import app from '../../server';
import {
  API_PREFIX,
  SIGNUP_SUCCESS,
  REQUIRED_FIELDS,
  EMAIL_EXISTS,
  SIGNIN_SUCCESS,
  INVALID_SIGNIN,
  REQUIRED_COMPARE_PASSWORDS
} from '../../helpers/constants';
import {userSeeds} from '../../database/seeders';

describe('Test the user signup', () => {
  it('should create a user successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user1);
    expect(response.body.message).toBe(SIGNUP_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should return an error if email exists', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user1);
    expect(response.body.message).toBe(EMAIL_EXISTS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without a firstname', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user2);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without a lastname', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user3);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without an email', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user4);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not create a user without an password', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signup`)
    .send(userSeeds.user5);
    expect(response.body.message).toBe(REQUIRED_FIELDS);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });
});

describe('Test the user signin', () => {
  it('should create a user successfully', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signin`)
    .send(userSeeds.user1);
    expect(response.body.message).toBe(SIGNIN_SUCCESS);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    done();
  });

  it('should not create a user without an email', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signin`)
    .send(userSeeds.user4);
    expect(response.body.message).toBe(INVALID_SIGNIN);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    done();
  });

  it('should not signin a user without an password', async(done) => {
    const response = await request(app).post(`${API_PREFIX}auth/signin`)
    .send(userSeeds.user5);
    expect(response.body.errors.message).toBe(REQUIRED_COMPARE_PASSWORDS);
    expect(response.status).toBe(500);
    done();
  });
});
