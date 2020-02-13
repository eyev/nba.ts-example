import { Request, Response } from 'express';
import { NbaPromise } from 'nba.ts';

const express = require('express');

export class PlayByPlayPromiseEndpoint {
  path = '/pbp-promise/:date/:gameId/:quarter';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.pbp);
  }

  pbp = (req: Request, res: Response) => {
    NbaPromise.playByPlay(req.params.date, req.params.gameId, req.params.quarter)
    .then(c => res.json(c))
    .catch(() => res.json({ status: 404, response: 'Unable to get Players!' }));
  };
}
