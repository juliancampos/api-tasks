import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { SetupServer } from './server/serverExpress';

const port = 3001;

AppDataSource
  .initialize()
  .then(() => {
    const server = new SetupServer(port);
    server.init();
  })
  .catch((error) => {
    console.log('Error: ', error)
  });
