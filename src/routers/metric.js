const express = require("express");
const client = require("prom-client");

const router = express.Router();

router.get("/", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

module.exports = router;
