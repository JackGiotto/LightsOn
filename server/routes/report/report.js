const express = require('express');
const router = express.Router();
const Light = require('../../models/Light');
const Report = require('../../models/Report');
const { requireAuth } = require('../../middleware/auth');

/**
 * @swagger
 * /light/{lightId}:
 *   get:
 *     summary: Recupera la segnalazione attiva di un lampione
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: lightId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del lampione
 *     responses:
 *       200:
 *         description: Dati della segnalazione attiva (o null se non presente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeReport:
 *                   oneOf:
 *                     - type: object
 *                       properties:
 *                         reportId:
 *                           type: string
 *                         approvedCounts:
 *                           type: integer
 *                         description:
 *                           type: string
 *                         state:
 *                           type: string
 *                     - type: 'null'
 *       404:
 *         description: Lampione non trovato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 activeReport:
 *                   type: 'null'
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 activeReport:
 *                   type: 'null'
 */
router.get('/light/:lightId', async (req, res) => {
    try {
        console.log("Fetching report for light ID:", req.params.lightId);
        const { lightId } = req.params;
        const light = await Light.findById(lightId)
            .select('activeReport')
            .populate('activeReport.reportId')
            .lean();

        if (!light) {
            return res.status(404).json({ message: 'Light not found', activeReport: null });
        }

        const report = light.activeReport?.reportId
            ? {
                reportId: light.activeReport.reportId._id,
                approvedCounts: light.activeReport.approvedCounts,
                description: light.activeReport.reportId.description,
                state: light.activeReport.reportId.status
            }
            : null;

        res.json({ activeReport: report });
    } catch (error) {
        res.status(500).json({ message: error.message, activeReport: null });
    }
});

/**
 * @swagger
 * /approve:
 *   post:
 *     summary: Approva (vota) una segnalazione
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportId
 *             properties:
 *               reportId:
 *                 type: string
 *                 description: ID della segnalazione da approvare
 *     responses:
 *       200:
 *         description: Voto aggiunto con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 approvedCounts:
 *                   type: integer
 *       400:
 *         description: reportId mancante o utente ha già votato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 alreadyVoted:
 *                   type: boolean
 *       404:
 *         description: Report non trovato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
router.post('/approve', requireAuth, async (req, res) => {
    // ... logica invariata
    try {
        const { reportId } = req.body;
        const userId = req.auth.userId;

        if (!reportId) {
            return res.status(400).json({ message: 'reportId obbligatorio' });
        }

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: 'Report non trovato' });
        }

        if (report.approvals.approvedBy.includes(userId)) {
            return res.status(400).json({
                message: 'Hai già votato questo report',
                alreadyVoted: true
            });
        }

        report.approvals.approvedBy.push(userId);
        report.data.lastApprovedAt = new Date();
        await report.save();

        const light = await Light.findById(report.lightId);
        if (light && light.activeReport?.reportId?.toString() === report._id.toString()) {
            light.activeReport.approvedCounts = report.approvals.approvedCounts;
            await light.save();
        }

        res.json({
            message: 'Voto aggiunto con successo',
            approvedCounts: report.approvals.approvedCounts
        });
    } catch (error) {
        console.error('Errore in /approve:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /new_report:
 *   post:
 *     summary: Crea una nuova segnalazione per un lampione
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lightId
 *               - userId
 *               - description
 *               - malfunctionType
 *             properties:
 *               lightId:
 *                 type: string
 *               userId:
 *                 type: string
 *               description:
 *                 type: string
 *               malfunctionType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reportId:
 *                   type: string
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
router.post(['/new_report', '/new_report/'], async (req, res) => {
    try {
        console.log("Creating new report with data:", req.body);
        const { lightId, userId, description, malfunctionType } = req.body;

        const newReport = new Report({
            lightId,
            userId,
            description,
            malfunctionType,
            approvals: {
                approvedCounts: 1,
                approvedBy: [userId]
            },
            status: 'pending',
            data: {
                createdAt: new Date(),
                lastApprovedAt: new Date()
            }
        });

        const savedReport = await newReport.save();

        const light = await Light.findById(lightId);
        if (light) {
            light.activeReport = {
                reportId: savedReport._id,
                approvedCounts: savedReport.approvals.approvedCounts
            };
            await light.save();
        }

        res.status(201).json({ message: 'Report created successfully', reportId: savedReport._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ADMIN SECTION

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Recupera tutte le segnalazioni (admin)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista di tutte le segnalazioni formattate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       lightId:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       problemType:
 *                         type: string
 *                       status:
 *                         type: string
 *                       upvoteCount:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       producer:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           phone:
 *                             type: string
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
router.get('/all', async (req, res) => {
    // ... logica invariata
    try {
        const reports = await Report.find()
            .populate('lightId', 'specs.manufacturer')
            .select('lightId description approvals malfunctionType status data')
            .lean();

        const formattedReports = reports.map(report => ({
            id: report._id,
            lightId: report.lightId?._id || report.lightId,
            date: report.data?.createdAt,
            problemType: report.malfunctionType,
            status: report.status,
            upvoteCount: report.approvals?.approvedCounts || 0,
            description: report.description || "",
            producer: {
                name: report.lightId?.specs?.manufacturer || "Sconosciuto",
                phone: "3454149835"
            }
        }));

        res.json({ reports: formattedReports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /status:
 *   post:
 *     summary: Aggiorna lo stato di una segnalazione (admin)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportId
 *               - status
 *             properties:
 *               reportId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, working on, resolved]
 *     responses:
 *       200:
 *         description: Stato aggiornato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Valore di stato non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Report non trovato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
router.post('/status', async (req, res) => {
    // ... logica invariata
    try {
        const { reportId, status } = req.body;

        const VALID_STATUSES = ['pending', 'working on', 'resolved'];
        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        report.status = status;
        await report.save();

        if (status === 'resolved') {
            const light = await Light.findById(report.lightId);
            if (light && light.activeReport?.reportId?.toString() === report._id.toString()) {
                light.activeReport = { reportId: null, approvedCounts: 0 };
                await light.save();
            }
        }

        res.json({ message: 'Status updated successfully', status: report.status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;