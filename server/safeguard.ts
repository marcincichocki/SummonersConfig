/// <reference path="../typings/moment/moment.d.ts"/>


import moment = require('moment');

// Date which determines when new season started.
const SEASON_6: moment.Moment = moment('2015-12-1');

/**
 * Check if account was visited after season update. If it was, we can
 * be sure that old masteries are removed, and recived data will not break
 * the application.
 * @param {number} revisionDate - Miliseconds representing date of last
 * activity on the checked account.
 * @return {boolean}
 */
export default function isSafe(revisionDate: number): boolean {
  return moment(revisionDate).isAfter(SEASON_6);
}
