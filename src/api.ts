import { Application } from 'express';
const express = require('express');

export class Api {
  public app: Application;
  public port: number;

  constructor(app: { port: number; controllers: any }) {
    this.app = express();
    this.port = app.port;
    this.routes(app.controllers);
  }



  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
