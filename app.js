require('dotenv').config();
const express = require('express');

const http = require('http');
const socketIo = require('socket.io');
const { serverConfig } = require('./config/config');
const { sequelize } = require('./db/models');
const phonesRouter = require('./routes/api/phonesRouter');
const { PhoneNumber } = require('./db/models');

const app = express();
const server = http.createServer(app);

const io = socketIo(
  server,
  {
    cors: {
      origin: ['http://localhost:3000'],
    },
  },
);

io.on('connection', (socket) => {
  console.log('Новое соединение', socket.id);

  socket.on('message', async (message) => {
    console.log('Сообщение', message);
    const {
      code, number, country, flag,
    } = message;
    const newPhone = await PhoneNumber.create({
      code, number, country, flag,
    });
    io.emit('message', newPhone);
  });

  socket.on('disconnect', () => {
    console.log('Отключено');
  });
});

const PORT = process.env.PORT ?? 4000;

serverConfig(app);

app.use('/api/phones', phonesRouter);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
    server
      .listen(PORT)
      .on('listening', () => console.log('Сервер слушает порт'))
      .on('error', (error) => console.log('Ошибка при запуске сервера', error));
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
}

testConnection();
