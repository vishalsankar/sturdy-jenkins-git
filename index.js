require('./tracer');

const express = require('express');
const client = require('prom-client');
const app = express();

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/ping', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulated latency
  res.send('pong');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => console.log('Listening on port 3000'));
