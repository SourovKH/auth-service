const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const {
  ConsoleSpanExporter,
  BasicTracerProvider,
  SimpleSpanProcessor,
} = require("@opentelemetry/sdk-trace-base");

// The OTLP protocol is used to send traced data over HTTP to a backend (like Jaeger or any OTLP-compliant collector).
const traceExporter = new OTLPTraceExporter({
  "service.name": "Auth-service",
  url: "http://localhost:4318/v1/traces",
});

// The BasicTracerProvider is responsible for managing trace data and spans created by your application.
const provider = new BasicTracerProvider({
  resource: new Resource({
    "service.name": "Auth-service",
  }),
});

// addSpanProcessor is used to chain multiple exporter to a single traing provider
// SimpleSpanProcessor sends spans to an exporter immediately after they finish.
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));

provider.register();
