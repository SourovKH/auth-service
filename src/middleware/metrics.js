const client = require("prom-client");

client.collectDefaultMetrics();
const register = new client.Registry();

const counter = new client.Counter({
  name: "total_request",
  help: "Total number of requests in auth service",
});

const errorMetric = new client.Counter({
  name: "total_errors",
  help: "Total number of HTTP errors",
  labelNames: ["method", "status"],
});

const requestCounter = (req, res, next) => {
  counter.inc();
  next();
};

const errorCounter = (err, req, res, next) => {
  errorMetric.inc({ method: req.method, status: 500 });
  next();
};

register.registerMetric(requestCounter);
register.registerMetric(errorCounter);

module.exports = { register, requestCounter, errorCounter };
