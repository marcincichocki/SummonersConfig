/**
 * Produces http errors. Usage:
 *
 *
 * var error = new ErrorFactory();
 * res.status(404).send(error.new(404));
 */
export class ErrorFactory {
  private _messages = {
    '400': 'Bad request.',
    '401': 'Unauthorized.',
    '404': 'No summoner data found for any specified inputs.',
    '429': 'Rate limit exceeded.',
    '500': 'Internal server error.',
    '503': 'Service unavailable.',

    // custom errors
    '471': 'Old season.'
  }


  /**
   * Create error object.
   * @param {number} statusCode - Http status code.
   * @param {string} [message=''] - Additional message.
   */
  new(statusCode: number, message: string = ''): {statusCode: number, message: string} {
    return {
      statusCode,
      message: `${this._messages[statusCode]} ${message}`
    };
  }
}
