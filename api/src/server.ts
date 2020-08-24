import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';

import routes from './routes';

class Server {
  public server: http.Server;

  private express: express.Application;

  public constructor() {
    this.express = express();

    this.server = new (http.Server)(this.express);

    this.middlewares();
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
    this.express.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    this.express.use(errors());
  }
}

export default new Server().server;
