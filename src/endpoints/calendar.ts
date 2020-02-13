import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class CalendarEndpoint {
  path = '/calendar';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.calendar);
  }

  calendar = (req: Request, res: Response) => {
    Nba.calendar()
      .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Calendar!' }))))
      .subscribe(c => res.json(c));
  };
}
