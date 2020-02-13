import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class ScoreboardEndpoint {
  path = '/scoreboard/:date';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.scoreboard);
  }

  scoreboard = (req: Request, res: Response) => {
    Nba.scoreboard(req.params.date)
      .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Scoreboard!' }))))
      .subscribe(c => res.json(c));
  };
}


