const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    otp: { type: String },
    otpExpiry: { type: Date },
    isAdmin: {type: Boolean, default: false},
    adminId: {type: Number, required: false, default: null},
});

module.exports = mongoose.model('User', userSchema);