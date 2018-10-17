import {TestHelper} from "../test.helper";
import {typing, unread, history} from "./message.reducer";
import {READ, SENT, TYPING} from "./message.actions";
import {AuthorModel} from "../author/author.model";
import {MessageModel} from "./message.model";


describe('testing message reducers', () => {
  /**
   *
   * @type {{state: *, action: {} | {type: string, payload: *}}}
   */
  const context = {};
  /**
   *
   * @type {AuthorModel}
   */
  const author = new AuthorModel(1);

  beforeEach(() => {
    context.action = {};
  });

  afterEach(() => {
    TestHelper.clearContext(context);
  });

  describe('testing typing', () => {
    /**
     * @type function
     */
    const typingCall = typing(author);

    test('author initiation', () => {
      expect(() => typing()).toThrow();
      expect(() => typing(null)).toThrow();
      expect(() => typing('not a number')).toThrow();
      expect(() => typing({})).toThrow();
      expect(() => typing([])).toThrow();

      expect(() => typing('1')).not.toThrow();
      expect(() => typing(1)).not.toThrow();
      expect(() => typing(new AuthorModel())).not.toThrow();
    });

    describe('testing typing on default action type', () => {
      const state = 'expected';
      beforeEach(() => {
        context.state = state;
      });

      test('default state value', () => {
        const def = '';
        context.action.type = 'unknown';
        delete context.state;
        expect(typingCall(context.state, context.action)).toBe(def);
      });

      test('unknown type, state unchanged', () => {
        context.action.type = 'unknown';
        expect(typingCall(context.state, context.action)).toBe(state);
      });

      test('undefined type, state unchanged', () => {
        expect(typingCall(context.state, context.action)).toBe(state);
      });

    });

    describe('testing typing on SENT action type', () => {
      const state = 'typin';
      const result = '';
      beforeEach(() => {
        context.state = state;
        context.action.type = SENT;
      });

      test('default state value', () => {
        delete context.state;
        expect(typingCall(context.state, context.action)).toBe(result);
      });

      test('initial state cleared', () => {
        const init = context.state;
        expect(typingCall(context.state, context.action)).not.toBe(init);
        expect(typingCall(context.state, context.action)).toBe(result);
      });

    });

    describe('testing typing on TYPING action type', () => {
      beforeEach(() => {
        context.action.type = TYPING;
      });

      describe('same author on TYPING action type', () => {
        const typer = author;
        const text = 'p';
        beforeEach(() => {
          context.action.payload = {author: typer, text};
        });

        test('author and typer are AuthorModel instances', () => {
          expect(typingCall(context.state, context.action)).toBe(text);
        });

        test('author is an id', () => {
          expect(typing(author.id)(context.state, context.action)).toBe(text);
        });

      });

      describe('different author on TYPING action type', () => {
        const id = 'identifier';
        const typer = new AuthorModel(id);
        const state = 'pin';
        const text = 'ping';
        beforeEach(() => {
          context.state = state;
          context.action.payload = {author: typer, text};
        });

        test('default state value', () => {
          const def = '';
          delete context.state;
          expect(typingCall(context.state, context.action)).toBe(def);
        });

        test('typer is undefined', () => {
          delete context.action.payload.author;
          expect(() => typingCall(context.state, context.action)).toThrow();
        });

        test('typer is not instance of AuthorModel', () => {
          context.action.payload.author = 5;
          expect(() => typingCall(context.state, context.action)).toThrow();
        });

        test('typer is not same as author', () => {
          expect(typingCall(context.state, context.action)).toBe(state);
        });
      });
    });
  });

  describe('testing unread', () => {
    /**
     * @type function
     */
    const unreadCall = unread(author);
    test('author initiation', () => {
      expect(() => unread()).toThrow();
      expect(() => unread(null)).toThrow();
      expect(() => unread('not a number')).toThrow();
      expect(() => unread({})).toThrow();
      expect(() => unread([])).toThrow();

      expect(() => unread('1')).not.toThrow();
      expect(() => unread(1)).not.toThrow();
      expect(() => unread(new AuthorModel())).not.toThrow();
    });

    describe('testing unread on default action type', () => {
      const state = [18];
      beforeEach(() => {
        context.state = state;
      });

      test('default state value', () => {
        const def = [];
        context.action.type = 'unknown';
        delete context.state;
        expect(unreadCall(context.state, context.action)).toEqual(def);
      });

      test('unknown type, state unchanged', () => {
        context.action.type = 'unknown';
        expect(unreadCall(context.state, context.action)).toEqual(state);
      });

      test('undefined type, state unchanged', () => {
        expect(unreadCall(context.state, context.action)).toEqual(state);
      });

    });

    describe('testing unread on SENT action type', () => {
      const text = 'typed message';
      const state = [18];
      beforeEach(() => {
        context.state = state;
        context.action.type = SENT;
      });

      describe('same author on SENT action type', () => {
        const message = new MessageModel(text, author);
        const result = state.concat(message.id);
        beforeEach(() => {
          context.action.payload = message;
        });

        test('default state value', () => {
          const expected = [].concat(message.id);
          delete context.state;
          expect(unreadCall(context.state, context.action)).toEqual(expected);
        });

        test('author and sender are AuthorModel instances', () => {
          expect(unreadCall(context.state, context.action)).toEqual(result);
        });

        test('author is an id', () => {
          expect(unread(author.id)(context.state, context.action)).toEqual(result);
        });
      });

      describe('different author on SENT action type', () => {
        const sender = new AuthorModel('identifier');
        const message = new MessageModel(text, sender);

        beforeEach(() => {
          context.action.payload = message;
        });

        test('default state value', () => {
          const def = [];
          delete context.state;
          expect(unreadCall(context.state, context.action)).toEqual(def);
        });

        test('message is undefined', () => {
          delete context.action.payload;
          expect(() => unreadCall(context.state, context.action)).toThrow();
        });

        test('message not instance of MessageModel', () => {
          context.action.payload = 28;
          expect(() => unreadCall(context.state, context.action)).toThrow();
        });

        test('sender is not same as author', () => {
          expect(unreadCall(context.state, context.action)).toEqual(state);
        });

      });

    });

    describe('testing unread on READ action type', () => {
      const state = [18];
      beforeEach(() => {
        context.state = state;
        context.action.type = READ;
      });

      describe('same author on READ action type', () => {
        const reader = author;
        const result = [];
        beforeEach(() => {
          context.action.payload = reader;
        });

        test('default state value', () => {
          delete context.state;
          expect(unreadCall(context.state, context.action)).toEqual(result);
        });

        test('author and sender are AuthorModel instances', () => {
          expect(unreadCall(context.state, context.action)).toEqual(result);
        });

        test('author is an id', () => {
          expect(unread(author.id)(context.state, context.action)).toEqual(result);
        });
      });

      describe('different author on READ action type', () => {
        const reader = new AuthorModel('identifier');

        beforeEach(() => {
          context.action.payload = reader;
        });

        test('default state value', () => {
          const def = [];
          delete context.state;
          expect(unreadCall(context.state, context.action)).toEqual(def);
        });

        test('reader is undefined', () => {
          delete context.action.payload;
          expect(() => unreadCall(context.state, context.action)).toThrow();
        });

        test('reader not instance of AuthorModel', () => {
          context.action.payload = 28;
          expect(() => unreadCall(context.state, context.action)).toThrow();
        });

        test('reader is not same as author', () => {
          expect(unreadCall(context.state, context.action)).toEqual(state);
        });

      });

    });

  });

  describe('testing history', () => {
    const state = [new MessageModel('p', new AuthorModel(18))];
    beforeEach(() => {
      context.state = state;
    });

    describe('testing history on default action type', () => {

      test('default state value', () => {
        const def = [];
        context.action.type = 'unknown';
        delete context.state;
        expect(history(context.state, context.action)).toEqual(def);
      });

      test('unknown type, state unchanged', () => {
        context.action.type = 'unknown';
        expect(history(context.state, context.action)).toEqual(state);
      });

      test('undefined type, state unchanged', () => {
        expect(history(context.state, context.action)).toEqual(state);
      });
    });

    describe('testing history on SENT action type', () => {
      const message = new MessageModel('t', author);
      const result = state.concat(message);
      beforeEach(() => {
        context.action.type = SENT;
        context.action.payload = message;
      });

      test('message is undefined', () => {
        delete context.action.payload;
        expect(() => history(context.state, context.action)).toThrow();
      });

      test('message is not instance of MessageModel', () => {
        context.action.payload = 445;
        expect(() => history(context.state, context.action)).toThrow();
      });

      describe('message added to history', () => {
        test('default state value', () => {
          const def = [].concat(message);
          delete context.state;
          expect(history(context.state, context.action)).toEqual(def);
        });

        test('any state value', () => {
          expect(history(context.state, context.action)).toEqual(result);
        });
      });

    });
  });


});