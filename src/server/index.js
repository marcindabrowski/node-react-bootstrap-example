const express = require('express');
const path = require('path');
const chalk = require('chalk');
const initServer = require('./initServer');

const app = express();
const DOCS_PATH = '../../docs/';
const PORT = process.env.PORT || 8082;
const IP_ADRESS = 'localhost';

app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

app.use(express.static(path.join(__dirname, DOCS_PATH)));

initServer(app);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, DOCS_PATH, 'index.html')));

/* eslint-disable no-console */
app.listen(
  PORT,
  IP_ADRESS,
  () => console.log(`
    =====================================================
    -> Server (${chalk.bgBlue('SPA')}) 🏃 (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    =====================================================
  `),
);
/* eslint-enable no-console */
