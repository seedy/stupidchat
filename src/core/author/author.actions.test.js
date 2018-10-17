import {TestHelper} from "../test.helper";
import {CONNECT, login} from "./author.actions";
import {AuthorModel} from "./author.model";

describe('testing author actions', () => {
  const context = {};

  afterEach(() => {
    TestHelper.clearContext(context);
  });

  describe('testing login action', () => {
    const type = CONNECT;

    test('instance of AuthorModel expected as param', () => {
      context.author = 25;
      expect(() => login(context.author)).toThrow();
    });

    test('action created', () => {
      const author = new AuthorModel(1);
      const expected = {type, payload: author};
      context.author = author;

      expect(login(context.author)).toEqual(expected);
    });

  });
});