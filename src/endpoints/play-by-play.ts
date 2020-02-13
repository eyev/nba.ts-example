import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class PlayByPlayEndpoint {
  path = '/pbp/:date/:gameId/:quarter';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.pbp);
  }

  pbp = (req: Request, res: Response) => {
    Nba.playByPlay(req.params.date, req.params.gameId, req.params.quarter)
    .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Players!' }))))
    .subscribe(c => res.json(c));
  };
}
