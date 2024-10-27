const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const authRouter = require("./src/routers/auth");
const { logger } = require("./src/middleware/logger");
const metricRouter = require("./src/routers/metric");
const { requestCounter } = require("./src/middleware/metrics");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

connectDB();

app.use("/metrics", metricRouter);
app.use(requestCounter);

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
