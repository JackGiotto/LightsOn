const express = require('express');
const router = express.Router();
const Light = require('../../models/Light');
const Report = require('../../models/Report');
const { requireAuth } = require('../../middleware/auth');

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

router.post('/approve', requireAuth, async (req, res) => {
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

router.get('/all', async (req, res) => {
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
                phone: "3454149835" // numero fittizio, sempre lo stesso
            }
        }));

        res.json({ reports: formattedReports });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const VALID_STATUSES = ['pending', 'working on', 'resolved'];

router.post('/status', async (req, res) => {
    try {
        const { reportId, status } = req.body;

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
            // Only clear the light's activeReport if it's still pointing at this
            // report, so we don't wipe out a newer report on the same light.
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



