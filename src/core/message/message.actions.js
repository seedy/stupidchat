export const TYPING = 'core/message/TYPING';
export const SENT = 'core/message/SENT';
export const READ = 'core/message/READ';

export function isTyping(author, text) {
  return {type: TYPING, payload: {author, text}};
}

export function isSent(message) {
  return {type: SENT, payload: message};
}

export function isRead(author) {
  return {type: READ, payload: author};
}