# Summoner's Config

_Test runes and masteries setups!_

> Runes and masteries playground inside your browser!


## Installation

_[nodejs is requeired](http://nodejs.org/)_

1. Clone this repository(git is required) or download zip, extract, open terminal and go to app's root directory.
2. `$ npm install`
3. Create api.ts file in `server/` directory, paste code below and change api key to your own.

  ```javascript
  // Here goes api key. If you don't have
  // any, visit: https://developer.riotgames.com/
  const API_KEY = 'YOUR API KEY';

  export default API_KEY;
  ```

4. `$ npm run build:server && npm run build:client && gulp styles`
5. `$ npm start`
6. Visit [http://localhost:3000/src](http://localhost:3000/src) in your browser.
7. Play as you will!

## Change log

All changes are listed [here](/CHANGELOG.md).


## Former project

Old version is available [here](https://github.com/marcincichocki/SummonersConfigOld). Please note that this project is no longer maintained.


## License

*Summoner's Config isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.*

[MIT](/LICENSE.md) © Marcin Cichocki
