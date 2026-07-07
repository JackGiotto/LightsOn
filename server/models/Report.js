const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    lightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Light',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    approvals: {
        approvedCounts: {
            type: Number,
            default: 1
        },
        approvedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    data: {
        status: {
            type: String,
            enum: ['pending', 'working on', 'resolved'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        lastApprovedAt: {
            type: Date,
            default: Date.now
        }
    }
})


module.exports = mongoose.model('Report', ReportSchema);