import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class GameEndpoint {
  path = '/game/:date/:gameId';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.game);
  }

  game = (req: Request, res: Response) => {
    Nba.game(req.params.date, req.params.gameId)
      .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to find game!' }))))
      .subscribe(g => { console.log('hit'); res.json(g) });
  };
}
