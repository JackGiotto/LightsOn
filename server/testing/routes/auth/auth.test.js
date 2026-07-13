// testing/routes/auth/auth.test.js
const request = require('supertest');
const express = require('express');
const router = require('../../../routes/auth');
const User = require('../../../models/User');
const { createHashed, checkPassword } = require('../../../utils/cipher');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// dependencies
jest.mock('../../../models/User');
jest.mock('../../../utils/cipher');
jest.mock('jsonwebtoken');
jest.mock('crypto');

// Express
const app = express();
app.use(express.json());
app.use('/auth', router);

process.env.JWT_SECRET = 'testsecret';

describe('Auth routes (semplice)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/signup', () => {
    it('dovrebbe fallire se mancano campi obbligatori', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send({ email: 'test@example.com', password: '123' }); // manca firstName e lastName
      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('Campi obbligatori mancanti');
    });

    it('dovrebbe creare un utente con successo', async () => {
      User.findOne.mockResolvedValue(null); // nessun utente esistente
      createHashed.mockResolvedValue('hashedPassword');
      const mockUser = {
        _id: 'userId',
        role: 'user',
        save: jest.fn().mockResolvedValue(true)
      };
      User.mockImplementation(() => mockUser);
      jwt.sign.mockReturnValue('fakeToken');
      crypto.randomUUID.mockReturnValue('fakeUuid');

      const response = await request(app)
        .post('/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Mario',
          lastName: 'Rossi'
        });

      expect(response.status).toBe(201);
      expect(response.body.msg).toBe('Utente creato con successo');
      expect(response.body.role).toBe('user');
      expect(User).toHaveBeenCalledWith({
        email: 'test@example.com',
        passwordHash: 'hashedPassword',
        profile: { firstName: 'Mario', lastName: 'Rossi' },
        authMethods: { hasPassword: true }
      });
      expect(mockUser.save).toHaveBeenCalled();
      // Controllo che il cookie sia impostato (opzionale)
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });

  describe('POST /auth/login', () => {
    it('dovrebbe fallire con credenziali errate (utente non trovato)', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrong' });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('Username o password errati');
    });

    it('dovrebbe fallire con password errata', async () => {
      const user = { passwordHash: 'hashed', role: 'user' };
      User.findOne.mockResolvedValue(user);
      checkPassword.mockResolvedValue(false);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'wrongPassword' });

      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('Username o password errati');
    });

    it('dovrebbe effettuare il login con successo', async () => {
      const user = {
        _id: 'userId',
        passwordHash: 'hashed',
        role: 'admin'
      };
      User.findOne.mockResolvedValue(user);
      checkPassword.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fakeToken');
      crypto.randomUUID.mockReturnValue('fakeUuid');

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('Login effettuato con successo');
      expect(response.body.role).toBe('admin');
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });
});