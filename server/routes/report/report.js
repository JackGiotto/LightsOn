const express = require('express');
const router = express.Router();
const Light = require('../../models/Light');
const Report = require('../../models/Report');

router.get('/light/:lightId', async (req, res) => {
    try {
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

router.post('/approve', async (req, res) => {
    try {
        const { reportId } = req.body;
        // const { userId } = req.user;

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        // if (report.approvedBy.includes(userId)) {
        //     return res.status(400).json({ message: 'Report already approved' });
        // }

        report.approvals.approvedCounts += 1;
        // report.approvals.approvedBy.push(userId);
        report.data.lastApprovedAt = new Date();
        await report.save();

        const light = await Light.findById(report.lightId);
        if (light) {
            light.activeReport.approvedCounts = report.approvals.approvedCounts;
            await light.save();
        }

        res.json({ message: 'Report approved successfully', approvedCounts: report.approvals.approvedCounts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('new_report', async (req, res) => {
    try {
        const { lightId, userId, description } = req.body;

        const newReport = new Report({
            lightId,
            userId,
            description,
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

module.exports = router;