import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class PlayerEndpoint {
  path = '/player/:year/:id';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.player);
  }

  player = (req: Request, res: Response) => {
    Nba.playerProfile(req.params.year, req.params.id)
    .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Player!' }))))
    .subscribe(c => res.json(c));
  };
}

