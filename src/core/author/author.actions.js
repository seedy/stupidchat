export const CONNECT = 'core/author/CONNECT';

export function login(author) {
  return {type: CONNECT, payload: author};
}