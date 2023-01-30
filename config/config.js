const express = require('express');
const morgan = require('morgan');

const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

exports.serverConfig = (app) => {
  app.use(morgan('tiny', { stream: accessLogStream }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
