import {AuthorModel} from "./author.model";

export const CONNECT = 'core/author/CONNECT';

/**
 *
 * @param author {AuthorModel}
 * @returns {{type: string, payload: AuthorModel}}
 */
export function login(author) {
  if (!(author instanceof AuthorModel)) {
    throw new Error('login action creator expects an instance of AuthorModel as param');
  }
  return {type: CONNECT, payload: author};
}