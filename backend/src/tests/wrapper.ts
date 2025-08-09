import request from 'sync-request-curl';
import dotenv from 'dotenv';

dotenv.config();

const SERVER_URL = `${process.env.URL}:${process.env.PORT}`;
const TIMEOUT_MS = 5 * 1000;

/** HTTP request for echo
 *
 * @param {string} value
 * @returns {{ body: string, statusCode: number }}
 */
export function requestEcho(
  value: string
) : {
  body: string,
  statusCode: number
} {
  const res = request('GET', SERVER_URL + '/echo', {
    qs: { value },
    timeout: TIMEOUT_MS
  });
  return { body: JSON.parse(res.body.toString()), statusCode: res.statusCode };
}
