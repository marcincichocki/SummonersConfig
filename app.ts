/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/request-promise/request-promise.d.ts"/>
/// <reference path="typings/q/Q.d.ts"/>

import express = require('express');
import rp = require('request-promise');
import q = require('q');

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
  // Complicated logic here.
});
