import { Request, Response } from 'express';
import { Nba } from 'nba.ts';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const express = require('express');

export class CurrentYearCalendarEndpoint {
  path = '/calendar/current';
  router = express.Router();

  constructor() {
    this.router.get(this.path, this.calendar);
  }

  calendar = (req: Request, res: Response) => {
    Nba.currentYearCalendar()
      .pipe(catchError(() => of(res.json({ status: 404, response: 'Unable to get Calendar!' }))))
      .subscribe(c => res.json(c));
  };
}
