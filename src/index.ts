import { Api } from './api';
import { GameEndpoint } from './endpoints/game';
import { CalendarEndpoint } from './endpoints/calendar';
import { CurrentYearCalendarEndpoint } from './endpoints/current-year-calendar';
import { ScoreboardEndpoint } from './endpoints/scoreboard';
import { PlayByPlayEndpoint } from './endpoints/play-by-play';
import { PlayerEndpoint } from './endpoints/player';
import { PlayersEndpoint } from './endpoints/players';
import { PlayByPlayPromiseEndpoint } from './endpoints/play-by-play-promise';

const app = new Api({
  port: 4201,
  controllers: [
    new CalendarEndpoint(),
    new CurrentYearCalendarEndpoint(),
    new GameEndpoint(),
    new ScoreboardEndpoint(),
    new PlayByPlayEndpoint(),
    new PlayerEndpoint(),
    new PlayersEndpoint(),
    new PlayByPlayPromiseEndpoint()
  ],
});

app.listen();
