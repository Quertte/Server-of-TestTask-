require('dotenv').config();

const express = require('express');
const config = require('config');
const { serverConfig } = require('./config/config');

const { sequelize } = require('./db/models');

const app = express();

const PORT = process.env.PORT ?? 4000;

serverConfig(app);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
    app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
}

testConnection();
