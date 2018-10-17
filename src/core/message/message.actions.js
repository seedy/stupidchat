import {AuthorModel} from "../author/author.model";
import {MessageModel} from "./message.model";

export const TYPING = 'core/message/TYPING';
export const SENT = 'core/message/SENT';
export const READ = 'core/message/READ';

/**
 *
 * @param author {AuthorModel}
 * @param text {string}
 * @returns {{type: string, payload: {author: AuthorModel, text: string}}}
 */
export function isTyping(author, text) {
  if (!(author instanceof AuthorModel)) {
    throw new Error('isTyping action creator expects an instance of AuthorModel as param');
  }

  return {type: TYPING, payload: {author, text}};
}

/**
 *
 * @param message {MessageModel}
 * @returns {{type: string, payload: MessageModel}}
 */
export function isSent(message) {
  if (!(message instanceof MessageModel)) {
    throw new Error('isSent action creator expects an instance of MessageModel as param');
  }
  return {type: SENT, payload: message};
}

/**
 *
 * @param author {AuthorModel}
 * @returns {{type: string, payload: AuthorModel}}
 */
export function isRead(author) {
  if (!(author instanceof AuthorModel)) {
    throw new Error('isRead action creator expects an instance of AuthorModel as param');
  }
  return {type: READ, payload: author};
}