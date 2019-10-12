/**
 * @description - function that handles database errors;
 * @param {string} error - error to log out
 * @returns {Function} - return process termination with error code
 */
export function handleDBError(error) {
  console.error(error);
  return process.exit(1);
}

/**
 * @description - function that handles error from requests
 * @param {Object} res - The response object
 * @param {string} error - error from request
 * @param {Number} responseStatusCode - the status code of response
 * @returns {string} - encrypted password
 */
export function handleResponseError(res, error, responseStatusCode) {
  return res.status(responseStatusCode).send({
    status: 'error',
    error
  });
}
