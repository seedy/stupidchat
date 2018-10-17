import {TYPING, READ, SENT} from './message.actions';
import {AuthorModel} from "../author/author.model";
import {MessageModel} from "./message.model";

// typing: string
export function typing(author) {
  initiateAuthorBasedReducer(author);
  /**
   * @param state {string}
   * @param action {{type: string, payload: {author: AuthorModel, text: string} | MessageModel}}
   */
  return (state = '', action) => {
    switch (action.type) {
      case TYPING:
        const typer = action.payload.author;
        const text = action.payload.text;
        checkInstance(typer, AuthorModel);
        return typer.isSame(author) ? text : state;
      case SENT:
        return '';
      default: return state;
    }
  }
}

// unread: number[]
export function unread(author) {
  initiateAuthorBasedReducer(author);
  /**
   * @param state {number[]}
   * @param action {{type: string, payload: MessageModel | AuthorModel}}
   */
  return (state = [], action) => {
    switch (action.type) {
      case SENT:
        const message = action.payload;
        checkInstance(message, MessageModel);
        return message.author.isSame(author) ? state.concat(message.id) : state;
      case READ:
        const reader = action.payload;
        checkInstance(reader, AuthorModel);
        return reader.isSame(author) ? [] : state;
      default: return state;
    }
  }
}

// history: MessageModel[]
/**
 *
 * @param state {MessageModel[]}
 * @param action {{type: string, payload: MessageModel}}
 * @returns {*}
 */
export function history(state = [], action) {

  switch (action.type) {
    case SENT:
      const message = action.payload;
      checkInstance(message, MessageModel);
      return state.concat(message);
    default: return state;
  }
}

function initiateAuthorBasedReducer(author) {
  if (!(author instanceof AuthorModel) && isNaN(parseInt(author, 10))) {
    throw new Error('typing reducer is wrongly initiated');
  }
}

function checkInstance(obj, type) {
  if(!obj || !(obj instanceof type)) {
    throw new Error('object is not instance of ' + type);
  }
}