/// <reference path="../typings/moment/moment.d.ts"/>


import moment = require('moment');

// FIXME: This should be date of last BREAKING change done to masteries.
// For example: new mastery added, or max points of mastery lowered etc.
//
// Date which determines when new season started.
export const SEASON_START: moment.Moment = moment('2015-11-11 11:01 +0000', 'YYYY-MM-DD HH:mm Z');


export const isSafe = (function() {

  // Date which determines when new season started.
  const seasonStart: moment.Moment = SEASON_START;

  /**
   * Check if account was visited after season update. If it was, we can
   * be sure that old masteries are removed, and recived data will not break
   * the application.
   * @param {number} revisionDate - Miliseconds representing date of last
   * activity on the checked account.
   * @return {boolean}
   */
  return function(revisionDate: number): boolean {
    return moment(revisionDate).isAfter(seasonStart);
  }
})();
