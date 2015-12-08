

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