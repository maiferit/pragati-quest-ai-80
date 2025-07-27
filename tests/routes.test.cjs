const request = require('supertest');
const app = require('../server.cjs');

describe('Auth and Chat API', () => {
  describe('POST /api/auth/signup', () => {
    it('returns 201 for valid signup', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ username: 'test', password: '123' });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: 'User created' });
    });

    it('returns 400 when data is missing', async () => {
      const res = await request(app).post('/api/auth/signup').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Missing fields' });
    });
  });

  describe('POST /api/auth/login', () => {
    it('returns token for valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'user', password: 'pass' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ token: 'fake-jwt-token' });
    });

    it('returns 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'wrong', password: '123' });
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({ error: 'Invalid credentials' });
    });
  });

  describe('POST /api/chat', () => {
    it('returns reply for valid message', async () => {
      const res = await request(app)
        .post('/api/chat')
        .send({ message: 'hello' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ reply: 'Message received' });
    });

    it('returns 400 when message missing', async () => {
      const res = await request(app).post('/api/chat').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Message required' });
    });
  });
});
