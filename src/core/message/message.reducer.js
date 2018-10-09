import {TYPING, READ, SENT} from './message.actions';

// typing: string
export function typing(author) {
  /**
   * state {string}
   * action {author: AuthorModel, text: string}
   */
  return (state = '', action) => {
    switch (action.type) {
      case TYPING:
        const typer = action.payload.author;
        const text = action.payload.text;
        return typer.isSame(author) ? text : state;
      case SENT:
        return '';
      default: return state;
    }
  }
}

// unread: number[]
export function unread(author) {
  return (state = [], action) => {
    switch (action.type) {
      case SENT:
        const message = action.payload;
        return !message.author.isSame(author) ? state.concat(message.id) : state;
      case READ:
        const reader = action.payload;
        return reader.isSame(author) ? [] : state;
      default: return state;
    }
  }
}

// history: MessageModel[]
export function history(state = [], action) {
  switch (action.type) {
    case SENT:
      const message = action.payload;
      return state.concat(message);
    default: return state;
  }
}