const chalk = require('chalk');
const express = require('express');
const path = require('path');
const throng = require('throng');
const initServer = require('./initServer');

const DOCS_PATH = '../../docs/';
const PORT = process.env.PORT || 8082;
const IP_ADDRESS = '0.0.0.0';
const WORKERS = process.env.WEB_CONCURRENCY || 1;

function startServer(workerId) {
  const app = express();

  app.set('port', PORT);
  app.set('ipAddress', IP_ADDRESS);

  app.use(express.static(path.join(__dirname, DOCS_PATH)));

  initServer(app);

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, DOCS_PATH, 'index.html')));

  /* eslint-disable no-console */
  app.listen(PORT, IP_ADDRESS, () =>
    console.log(`
    =====================================================
    -> Worker ${workerId} started server (${chalk.bgBlue('SPA')}) 🏃 (running) on ${chalk.green(IP_ADDRESS)}:${chalk.green(
  PORT,
)}
    =====================================================
  `),
  );
  /* eslint-enable no-console */
}

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: startServer,
});
