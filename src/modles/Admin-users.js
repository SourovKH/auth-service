const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    adminId: {type: Number, required: true},
});

module.exports = mongoose.model('Admin', userSchema);