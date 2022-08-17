import http from 'http';
import { Server } from 'socket.io';
import { OvernightServer } from './OvernightServer';
import express from 'express';

const overnightServer = new OvernightServer;

const serverHttp = http.createServer(overnightServer.app);
serverHttp.listen(3000, () => console.log('Socket.io listening on por: 3000'))

const io = new Server(serverHttp, {
  cors: {
    origin: ['http://localhost:19006']
  }
});

export {
  serverHttp,
  io
}
