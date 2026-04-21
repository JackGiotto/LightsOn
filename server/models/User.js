const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },

    passwordHash: { 
        type: String, 
        required: false // Not required for CIE users
    },

    profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },

    authMethods: {
        hasPassword: { type: Boolean, default: false },
        hasCie: { type: Boolean, default: false }
    },

    isVerified: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },

    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);