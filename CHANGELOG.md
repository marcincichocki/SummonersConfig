

<a name="0.3.0"></a>
# 0.3.0 (16.12.2015)

## Bug Fixes

* **tooltip** - Tooltip no longer "stretch" viewport and cause scroll to pop up. Now tooltip change position if there is not enough space[(1571fc3)](https://github.com/marcincichocki/SummonersConfig/commit/1571fc3), closes [#1](https://github.com/marcincichocki/SummonersConfig/issues/1).
* **tooltip** - Using `.clientX` and `.clientY` instead of `.x` and `.y`(Firefox support)[(16616d7)](https://github.com/marcincichocki/SummonersConfig/commit/16616d7).

## Features

* **import** - Notify user if data was loaded successfully or was there an error(basicly error handling)[(fbb288b)](https://github.com/marcincichocki/SummonersConfig/commit/fbb288b), closes [#11](https://github.com/marcincichocki/SummonersConfig/issues/11).

## BREAKING CHANGES

* **angular** - Updated angular to alpha 53[(23f4417)](https://github.com/marcincichocki/SummonersConfig/commit/23f4417).


<a name="0.2.0"></a>
# 0.2.0 (11.12.2015)

## Bug Fixes

* Styles inside templates are now prefixed to last 2 versions[(ec3b380)](https://github.com/marcincichocki/SummonersConfig/commit/ec3b380), closes [#4](https://github.com/marcincichocki/SummonersConfig/issues/4).
* Using dot notation for http response[(8464f19)](https://github.com/marcincichocki/SummonersConfig/commit/8464f19), closes [#6](https://github.com/marcincichocki/SummonersConfig/issues/6).

## Features

* New import module. Select server and summoner name to load runes and masteries[(3931af8)](https://github.com/marcincichocki/SummonersConfig/commit/3931af8), closes [#2](https://github.com/marcincichocki/SummonersConfig/issues/2).
* Updated app logo and added spinner on bootstrap[(c5f001c)](https://github.com/marcincichocki/SummonersConfig/commit/c5f001c), closes [#3](https://github.com/marcincichocki/SummonersConfig/issues/3).

## BREAKING CHANGES

* Updated angular to version 2.0.0-alpha.52[(7cd0986)](https://github.com/marcincichocki/SummonersConfig/commit/7cd0986).


<a name="0.1.0"></a>
# 0.1.0 (08.12.2015)

## Bug Fixes

* Mastery tooltip component now properly display description messages. All HTML tags inside messages are not escaped.

## Features

* Updated npm scripts(build, watch, start).
* Updated README.md(installation, license).
* Added .editorconfig

## BREAKING CHANGES

* Upgraded angular to version 2.0.0-alpha.48
* Changed `public/` to `src/`
* Transpiled app files are stored in orginal directories.
* App is using express server from now on. This is preparation for implementing import(this module will require backend proxy to protect user's api key).