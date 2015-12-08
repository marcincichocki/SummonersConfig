/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>

import express = require('express');

const PORT: number = 3000;
const app: express.Express = express();


app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
