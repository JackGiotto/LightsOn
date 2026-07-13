const express = require('express');
const router = express.Router();
const Light = require('../../models/Light');

/**
 * @swagger
 * /lights/age:
 *   get:
 *     summary: Calcola l'età di ogni lampione in base alla data di installazione
 *     tags: [Lights]
 *     responses:
 *       200:
 *         description: Lista di lampioni con età calcolata, ordinati per età decrescente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del lampione
 *                   manufacturer:
 *                     type: string
 *                     description: Produttore del lampione
 *                   installationDate:
 *                     type: string
 *                     format: date
 *                     description: Data di installazione
 *                   age:
 *                     type: number
 *                     nullable: true
 *                     description: Età in anni (approssimata a un decimale) o null se data mancante
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *                     description: Coordinate geografiche [longitudine, latitudine]
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/lights/age', async (req, res) => {
    try {
        const lights = await Light.find()
            .select('_id specs.installationDate specs.manufacturer location')
            .lean();

        const now = new Date();
        const lightsWithAge = lights.map(light => {
            let age = null;
            if (light.specs?.installationDate) {
                const installDate = new Date(light.specs.installationDate);
                const diffYears = (now - installDate) / (1000 * 60 * 60 * 24 * 365.25);
                age = Math.round(diffYears * 10) / 10; // arrotondato a 1 decimale
            }
            return {
                id: light._id,
                manufacturer: light.specs?.manufacturer || 'Sconosciuto',
                installationDate: light.specs?.installationDate,
                age: age,
                coordinates: light.location.coordinates
            };
        });

        lightsWithAge.sort((a, b) => (b.age || 0) - (a.age || 0));

        res.json(lightsWithAge);
    } catch (error) {
        console.error('Errore in /lights/age:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /lights/stats:
 *   get:
 *     summary: Statistiche globali dei lampioni (attivi, inattivi, interventi in corso)
 *     tags: [Lights]
 *     responses:
 *       200:
 *         description: Oggetto con statistiche e interventi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Numero totale di lampioni
 *                 active:
 *                   type: integer
 *                   description: Numero di lampioni attivi (senza segnalazioni attive)
 *                 inactive:
 *                   type: integer
 *                   description: Numero di lampioni inattivi (con segnalazione attiva)
 *                 interventions:
 *                   type: array
 *                   description: Interventi in corso o in attesa
 *                   items:
 *                     type: object
 *                     properties:
 *                       lightId:
 *                         type: string
 *                         description: ID del lampione
 *                       status:
 *                         type: string
 *                         enum: [pending, working on]
 *                         description: Stato della segnalazione
 *                       description:
 *                         type: string
 *                         description: Descrizione della segnalazione
 *                       reportId:
 *                         type: string
 *                         description: ID della segnalazione
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/lights/stats', async (req, res) => {
    try {
        const totalLights = await Light.countDocuments();

        const lightsWithActiveReport = await Light.find({
            'activeReport.reportId': { $ne: null }
        })
        .select('_id activeReport.reportId')
        .populate('activeReport.reportId', 'status description')
        .lean();

        const activeInterventions = lightsWithActiveReport.filter(
            light => light.activeReport?.reportId?.status === 'working on'
        );

        const inactiveLights = lightsWithActiveReport.length;
        const activeLights = totalLights - inactiveLights;

        const interventions = lightsWithActiveReport
            .filter(light => light.activeReport?.reportId?.status === 'working on' || light.activeReport?.reportId?.status === 'pending')
            .map(light => ({
                lightId: light._id,
                status: light.activeReport?.reportId?.status || 'pending',
                description: light.activeReport?.reportId?.description || 'Nessuna descrizione',
                reportId: light.activeReport?.reportId?._id
            }));

        res.json({
            total: totalLights,
            active: activeLights,
            inactive: inactiveLights,
            interventions: interventions
        });
    } catch (error) {
        console.error('Errore in /lights/stats:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;