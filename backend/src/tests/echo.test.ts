import {
  requestEcho
} from './wrapper';
import {
  OK,
  BAD_REQUEST,
  ERROR
} from './testUtils';

describe('echo', () => {
  describe('400 Error Cases', () => {
    test('Test invalid echo', () => {
      const res = requestEcho('echo');
      expect(res.body).toStrictEqual(ERROR);
      expect(res.statusCode).toStrictEqual(BAD_REQUEST);
    });
  });

  describe('200 Success Cases', () => {
    test('Test succesful echo', () => {
      const res = requestEcho('Hello');
      expect(res.body).toStrictEqual({ value: 'Hello' });
      expect(res.statusCode).toStrictEqual(OK);
    });
  });
});
