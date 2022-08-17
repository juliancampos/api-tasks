import express from 'express';
import { UserController } from '../controllers/userController';
import { Server } from 'socket.io';
import * as cors from 'cors';
import { /*app, */serverHttp } from './http';
import { OvernightServer } from './OvernightServer';

import '../websocket';

export class SetupServer extends OvernightServer {
  public io: Server;
  public httpServer: { listen: Function };

  constructor(private port = 3001) {
    super();
    this.httpServer = serverHttp;
  }

  public init(): void {
    this.setupExpress();
    this.setupCors();
    this.setupControllers();
    this.start();
  }

  private setupExpress(): void {
    this.app.use(express.json());
  }

  private setupCors(): void {
    const options: cors.CorsOptions = { origin: ['http://localhost:19006'] };
    this.app.use(cors.default(options));
  }

  private setupControllers(): void {
    this.addControllers([new UserController()]);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('Api listening on port: ', this.port);
    })
  }
}
