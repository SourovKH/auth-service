const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const authRouter = require('./src/routers/auth');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});