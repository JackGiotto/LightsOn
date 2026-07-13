const request = require('supertest');
const express = require('express');
const router = require('../../../routes/lights'); // aggiusta se necessario
const Light = require('../../../models/Light');

// Mock del modello Light
jest.mock('../../../models/Light');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Dashboard routes (semplice)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /dashboard/lights/age', () => {
    it('dovrebbe restituire la lista dei lampioni con età calcolata e ordinati per età decrescente', async () => {
      // Dati fittizi restituiti da Light.find()
      const mockLights = [
        {
          _id: 'light1',
          specs: {
            installationDate: '2020-01-15T00:00:00.000Z',
            manufacturer: 'Philips'
          },
          location: { coordinates: [12.5, 41.9] }
        },
        {
          _id: 'light2',
          specs: {
            installationDate: '2018-06-01T00:00:00.000Z',
            manufacturer: 'Osram'
          },
          location: { coordinates: [12.6, 41.8] }
        },
        {
          _id: 'light3',
          specs: {
            manufacturer: 'Sconosciuto'
          },
          location: { coordinates: [12.7, 41.7] }
        }
      ];

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockLights)
      };
      Light.find.mockReturnValue(mockQuery);

      const response = await request(app).get('/dashboard/lights/age');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);

      const now = new Date();
      const age1 = Math.round(((now - new Date('2020-01-15')) / (1000 * 60 * 60 * 24 * 365.25)) * 10) / 10;
      const age2 = Math.round(((now - new Date('2018-06-01')) / (1000 * 60 * 60 * 24 * 365.25)) * 10) / 10;

      expect(response.body[0].id).toBe('light2');
      expect(response.body[0].age).toBe(age2);
      expect(response.body[1].id).toBe('light1');
      expect(response.body[1].age).toBe(age1);
      expect(response.body[2].id).toBe('light3');
      expect(response.body[2].age).toBeNull();

      // Verifica che i campi siano presenti
      expect(response.body[0]).toHaveProperty('manufacturer');
      expect(response.body[0]).toHaveProperty('installationDate');
      expect(response.body[0]).toHaveProperty('coordinates');
    });

    it('dovrebbe gestire errori del database restituendo 500', async () => {
      Light.find.mockImplementation(() => {
        return {
          select: jest.fn().mockReturnThis(),
          lean: jest.fn().mockRejectedValue(new Error('DB error'))
        };
      });

      const response = await request(app).get('/dashboard/lights/age');
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('DB error');
    });
  });

  describe('GET /dashboard/lights/stats', () => {
    it('dovrebbe restituire le statistiche corrette', async () => {
      Light.countDocuments.mockResolvedValue(10);

      const mockLightsWithReports = [
        {
          _id: 'light1',
          activeReport: {
            reportId: {
              _id: 'report1',
              status: 'working on',
              description: 'Intervento in corso'
            }
          }
        },
        {
          _id: 'light2',
          activeReport: {
            reportId: {
              _id: 'report2',
              status: 'pending',
              description: 'In attesa'
            }
          }
        },
        {
          _id: 'light3',
          activeReport: {
            reportId: null
          }
        }
      ];

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockLightsWithReports)
      };
      Light.find.mockReturnValue(mockQuery);

      const response = await request(app).get('/dashboard/lights/stats');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 10,
        active: 8,
        inactive: 2,
        interventions: [
          {
            lightId: 'light1',
            status: 'working on',
            description: 'Intervento in corso',
            reportId: 'report1'
          },
          {
            lightId: 'light2',
            status: 'pending',
            description: 'In attesa',
            reportId: 'report2'
          }
        ]
      });

      expect(Light.countDocuments).toHaveBeenCalled();
      expect(Light.find).toHaveBeenCalledWith({ 'activeReport.reportId': { $ne: null } });
    });
  });
});