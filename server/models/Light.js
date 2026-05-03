const mongoose = require('mongoose');

const LightSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    activeReport: {
        reportId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
            default: null
        },
        approvedCounts: {
            type: Number,
            default: 0
        }
    },
    specs: {
        lightType: {
            type: String,
            enum: ['LED', 'HPS', 'LPS', 'MH', 'Other'],
        },
        power: Number, // Watt
        installationDate: Date,
        manufacturer: String,
        colorTemperature: Number, // Kelvin
        estimatedLifespan: Number, // Hours
        operation: {
            turnOnTime: { type: String, default: '20:00' },
            turnOffTime: { type: String, default: '06:00' }
        }
    }
});

LightSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Light', LightSchema);