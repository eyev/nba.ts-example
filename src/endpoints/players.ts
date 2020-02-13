import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class PlayersEndpoint {
  path = '/players/:year/:teamId?';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.players);
  }

  players = (req: Request, res: Response) => {
    if(!req.params.teamId) {
      return Nba.players(req.params.year)
      .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Players!' }))))
      .subscribe(c => res.json(c));
    }
    Nba.playersByTeamId(req.params.year, req.params.teamId)
    .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Players!' }))))
    .subscribe(c => res.json(c));

  };
}

