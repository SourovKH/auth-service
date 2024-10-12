const express = require("express");
const User = require("../modles/User");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

module.exports = router;