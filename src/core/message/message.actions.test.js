import {TestHelper} from "../test.helper";
import {isTyping, isSent, isRead, SENT, TYPING, READ} from "./message.actions";
import {AuthorModel} from "../author/author.model";
import {MessageModel} from "./message.model";

describe('testing message actions', () => {
  const context = {};

  afterEach(() => {
    TestHelper.clearContext(context);
  });

  describe('testing isTyping action', () => {
    const type = TYPING;
    const text = 'typin';
    const author = new AuthorModel(1);
    beforeEach(() => {
      context.text = text;
      context.author = author;
    });

    test('instance of AuthorModel expected as param', () => {
      context.author = 25;
      expect(() => isTyping(context.author, context.text)).toThrow();
    });

    test('action created', () => {
      const expected = {type, payload: {author, text}};
      expect(isTyping(context.author, context.text)).toEqual(expected);
    });

  });

  describe('testing isSent action', () => {
    const type = SENT;
    const message = new MessageModel('toto', new AuthorModel(1));
    beforeEach(() => {
      context.message = message;
    });

    test('instance of MessageModel expected as param', () => {
      context.message = 25;
      expect(() => isSent(context.message)).toThrow();
    });

    test('action created', () => {
      const expected = {type, payload: message};
      expect(isSent(context.message)).toEqual(expected);
    });

  });

  describe('testing isRead action', () => {
    const type = READ;
    const author = new AuthorModel(1);
    beforeEach(() => {
      context.author = author;
    });

    test('instance of AuthorModel expected as param', () => {
      context.author = 25;
      expect(() => isRead(context.author)).toThrow();
    });

    test('action created', () => {
      const expected = {type, payload: author};
      expect(isRead(context.author)).toEqual(expected);
    });

  });


});