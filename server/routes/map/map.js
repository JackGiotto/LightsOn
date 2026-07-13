const express = require('express');
const router = express.Router();
const Light = require('../../models/Light');

/**
 * @swagger
 * /lights:
 *   get:
 *     summary: Recupera i lampioni in base alla viewport e al livello di zoom (step)
 *     tags: [Lights]
 *     parameters:
 *       - in: query
 *         name: minLat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitudine minima del bounding box
 *       - in: query
 *         name: maxLat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitudine massima del bounding box
 *       - in: query
 *         name: minLng
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitudine minima del bounding box
 *       - in: query
 *         name: maxLng
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitudine massima del bounding box
 *       - in: query
 *         name: step
 *         schema:
 *           type: string
 *           default: "1"
 *         description: Livello di zoom (1, 2 o 3). Determina l'area effettiva e la fascia esterna da considerare.
 *       - in: query
 *         name: viewId
 *         schema:
 *           type: string
 *         description: Identificativo della vista (utile per il frontend)
 *     responses:
 *       200:
 *         description: Lista di lampioni nell'area richiesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 viewId:
 *                   type: string
 *                   description: Identificativo della vista passato come parametro
 *                 step:
 *                   type: integer
 *                   description: Livello di zoom convertito in intero
 *                 lights:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID del lampione
 *                       position:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: Coordinate [latitudine, longitudine]
 *                       approvedCounts:
 *                         type: integer
 *                         description: Numero di segnalazioni approvate per questo lampione
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/lights', async (req, res) => {
    try {
        const { minLat, maxLat, minLng, maxLng, step = "1", viewId } = req.query;
        const w_minLat = parseFloat(minLat), w_maxLat = parseFloat(maxLat);
        const w_minLng = parseFloat(minLng), w_maxLng = parseFloat(maxLng);

        const centerLat = (w_minLat + w_maxLat) / 2;
        const centerLng = (w_minLng + w_maxLng) / 2;
        const latDelta = w_maxLat - w_minLat;
        const lngDelta = w_maxLng - w_minLng;

        let factor = 1.0;
        let prevFactor = 0;

        if (step === "1") { factor = 0.2; }
        else if (step === "2") { factor = 0.6; prevFactor = 0.2; }
        else { factor = 1.0; prevFactor = 0.6; }

        const currentBox = [
            [centerLng - (lngDelta * factor) / 2, centerLat - (latDelta * factor) / 2],
            [centerLng + (lngDelta * factor) / 2, centerLat + (latDelta * factor) / 2]
        ];

        let query = { location: { $geoWithin: { $box: currentBox } } };
        if (prevFactor > 0) {
            const innerBox = [
                [centerLng - (lngDelta * prevFactor) / 2, centerLat - (latDelta * prevFactor) / 2],
                [centerLng + (lngDelta * prevFactor) / 2, centerLat + (latDelta * prevFactor) / 2]
            ];
            query = {
                $and: [
                    query,
                    { location: { $not: { $geoWithin: { $box: innerBox } } } }
                ]
            };
        }

        // console.log("Fetching lights for viewId:", viewId, "step:", step, "with query:", JSON.stringify(query));

        const lights = await Light.find(query)
            .select('location activeReport.approvedCounts')
            .lean();

        // Formats the lights to be ready for the frontend
        const formattedLights = lights.map(light => ({
            id: light._id,
            position: [light.location.coordinates[1], light.location.coordinates[0]],
            approvedCounts: light.activeReport?.approvedCounts || 0
        }));

        res.json({
            viewId,
            step: parseInt(step),
            lights: formattedLights
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;