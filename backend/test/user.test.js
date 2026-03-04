const request = require('supertest');
require('dotenv').config();

const BASE_URL = `http://localhost:8000`; 

describe('User API - 8 Test Cases', () => {
  let authToken = '';
  let createdUserId = '';
  
  const testUser = {
    username: `user_${Date.now()}`,
    email: `test_${Date.now()}@gmail.com`,
    password: 'securepassword123'
  };

  // --- REGISTRATION TESTS ---

  // 1. Valid Registration
  it('1. should create a new user successfully', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.body.success).toBe(true);
    if (res.body.user) createdUserId = res.body.user.id;
  });

  // 2. Missing Fields
  it('2. should return error if registration fields are missing', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({ email: 'onlyemail@test.com' });
    expect(res.body.success).toBe(false);
  });

  // 3. Duplicate Username/Email
  it('3. should fail if the username already exists', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send(testUser); // Sending the same data again
    expect(res.body.success).toBe(false);
  });

  // --- LOGIN TESTS ---

  // 4. Valid Login
  it('4. should login successfully and return a token', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token; // Save for authorized routes
  });

  // 5. Invalid Password
  it('5. should fail login with incorrect password', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });
    expect(res.body.success).toBe(false);
  });

  // --- AUTHORIZED ROUTES ---

  // 6. Get All Users (Authenticated)
  it('6. should fetch all users list when authenticated', async () => {
    const res = await request(BASE_URL)
      .get('/api/users/getallusers')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  // 7. Get User By ID
  it('7. should fetch specific user data by ID', async () => {
    const userId = createdUserId || 1;
    const res = await request(BASE_URL)
      .get(`/api/users/getusersbyid/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.body.success).toBe(true);
  });

  // 8. Unauthorized Access (Missing Token)
  it('8. should return 401 Unauthorized when token is missing', async () => {
    const res = await request(BASE_URL)
      .get('/api/users/getallusers');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});