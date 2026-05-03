const express = require('express');
const router = express.Router();
const Light = require('../../models/Light');

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