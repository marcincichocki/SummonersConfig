/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/request-promise/request-promise.d.ts"/>
/// <reference path="typings/q/Q.d.ts"/>
/// <reference path="typings/moment/moment.d.ts"/>

import express = require('express');
import rp = require('request-promise');
import q = require('q');
import moment = require('moment');

import {Summoner} from './server/Summoner';
import {Url} from './server/Url';
import API_KEY from './server/api';
import {isSafe, SEASON_START} from './server/safeguard';

const PORT: number = 3000;
const app: express.Express = express();


app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Request handler.
 *
 * Example:
 * http://localhost:3000/na/hiimgosu
 */
app.get('/:server/:name', (req, res) => {

  // Summoner server.
  const server: string = req.params.server;

  // Standardized summoner name.
  const name: string = req.params.name.toLowerCase().replace(/ /g, '');

  // Object which contains urls.
  const url: Url = new Url(server, name);

  console.log('Server: %s, name: %s', server, name);

  rp({
    uri: url.info(API_KEY),
    json: true
  }).then((data) => {

    // Summoner information.
    const summoner: Summoner = data[name];


    q.all([
      rp({
        uri: url.asset('runes', summoner.id, API_KEY),
        json: true
      }),
      rp({
        uri: url.asset('masteries', summoner.id, API_KEY),
        json: true
      })
    ]).spread((runes, masteries) => {
      if (isSafe(summoner.revisionDate)) {
        res.send({
          runes: runes[summoner.id].pages,
          masteries: masteries[summoner.id].pages,
          summoner
        });
      } else {
        // Sorry, only latest season supported!

        const lastActivity = moment(summoner.revisionDate);

        res.send(471, {
          code: 471,
          message: `Sorry, only current season(6) is supported! ` +
            `${summoner.name} was last seen ` +
            `${lastActivity.format("dddd, MMMM Do YYYY, h:mm:ss a")}(` +
            `${lastActivity.from(SEASON_START, true)} ` +
            `from the beginning of new season).`
        });
      }
    });
  }).catch((error) => {
    console.error('Error during lookup for summoner information\nerror: %d', error.statusCode);
    res.status(error.statusCode);
  });
});
