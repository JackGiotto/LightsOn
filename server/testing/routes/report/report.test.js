const request = require('supertest');
const express = require('express');
const router = require('../../../routes/report');
const Light = require('../../../models/Light');
const Report = require('../../../models/Report');

jest.mock('../../../models/Light');
jest.mock('../../../models/Report');

const app = express();
app.use(express.json());

const mockRequireAuth = (req, res, next) => {
  req.auth = { userId: 'mockUser123' };
  next();
};

jest.mock('../../../middleware/auth', () => ({
  requireAuth: (req, res, next) => {
    req.auth = { userId: 'mockUser123' };
    next();
  }
}));

app.use('/report', router);

describe('Report routes (Jest Mocked)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /report/new_report', () => {
    it('dovrebbe creare un report con successo e aggiornare il lampione', async () => {
      const mockSavedReport = {
        _id: 'newReportId123',
        approvals: { approvedCounts: 1 }
      };

      Report.prototype.save = jest.fn().mockResolvedValue(mockSavedReport);
      const mockLight = {
        _id: 'light123',
        activeReport: {},
        save: jest.fn().mockReolvedValue(true)
      };
      Light.findById.mockResolvedValue(mockLight);

      const response = await request(app)
        .post('/report/new_report')
        .send({
          lightId: 'light123',
          userId: 'user123',
          description: 'Lampione rotto',
          malfunctionType: 'Spento'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Report created successfully');
      expect(response.body.reportId).toBe('newReportId123');
      expect(mockLight.save).toHaveBeenCalled();
    });

    it('dovrebbe gestire i fallimenti ritornando 500 in caso di errore DB', async () => {
      Report.prototype.save = jest.fn().mockRejectedValue(new Error('Crash DB'));

      const response = await request(app)
        .post('/report/new_report')
        .send({ lightId: 'light123' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Crash DB');
    });
  });

  describe('POST /report/approve', () => {
    it('dovrebbe fallire se l\'utente ha già votato il report', async () => {
      const mockReport = {
        _id: 'report123',
        approvals: {
          approvedBy: ['mockUser123']
        }
      };
      Report.findById.mockResolvedValue(mockReport);

      const response = await request(app)
        .post('/report/approve')
        .send({ reportId: 'report123' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Hai già votato questo report');
      expect(response.body.alreadyVoted).toBe(true);
    });
  });

  describe('POST /report/status', () => {
    it('dovrebbe bloccare la richiesta se lo status non è valido', async () => {
      const response = await request(app)
        .post('/report/status')
        .send({ reportId: 'report123', status: 'broken' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid status value');
    });
  });
});