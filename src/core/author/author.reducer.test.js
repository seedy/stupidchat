import {authorById} from './author.reducer';
import {TestHelper} from "../test.helper";
import {CONNECT} from "./author.actions";
import {AuthorModel} from "./author.model";

describe('testing author reducer', () => {
  /**
   *
   * @type {{state: *, action: {} | {type: string, payload: *}}}
   */
  const context = {};

  beforeEach(() => {
    context.action = {};
  });

  afterEach(() => {
    TestHelper.clearContext(context);
  });

  describe('testing authorById on default action type', () => {
    const state = 'expected';
    beforeEach(() => {
      context.state = state;
    });

    test('default values', () => {
      const def = {};
      context.action.type = 'unknown';
      delete context.state;
      expect(authorById(context.state, context.action)).toEqual(def);
    });

    test('unknown type, state unchanged', () => {
      context.action.type = 'unknown';
      expect(authorById(context.state, context.action)).toBe(state);
    });

    test('undefined type, state unchanged', () => {
      expect(authorById(context.state, context.action)).toBe(state);
    });
  });

  describe('testing authorById on CONNECT action type ', () => {
    const state = {previous: 'expect'};
    const id = 'identifier';
    const author = new AuthorModel(id);
    const result = {...state, [id]: author};
    beforeEach(() => {
      context.action.type = CONNECT;
      context.action.payload = author;
      context.state = state;
    });

    test('default values', () => {
      const def = {[id]: author};
      delete context.state;
      expect(authorById(context.state, context.action)).toEqual(def);
    });

    test('author instance', () => {
      expect(authorById(context.state, context.action)).toEqual(result);
    });

    test('author undefined id', () => {
      const unknownAuthor = new AuthorModel();
      context.action.payload = unknownAuthor;
      expect(authorById(context.state, context.action)).toEqual(expect.objectContaining({undefined: unknownAuthor}));
    });

    test('throw payload not an author', () => {
      const notAuthor = {trying: 'tosneakin'};
      context.action.payload = notAuthor;
      expect(() => authorById(context.state, context.action)).toThrow();
    });

  });
});