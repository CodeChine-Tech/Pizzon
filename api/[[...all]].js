const serverless = require('serverless-http');
const { app } = require('../server-express');

module.exports = serverless(app);