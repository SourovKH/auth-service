const client = require("prom-client");

client.collectDefaultMetrics();
const register = new client.Registry();

const counter = new client.Counter({
  name: "total_request",
  help: "metric_help",
});

const requestCounter = (req, res, next) => {
  counter.inc();
  next();
};

register.registerMetric(requestCounter);

module.exports = { register, requestCounter };
