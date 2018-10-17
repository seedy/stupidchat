import {CONNECT} from "./author.actions";
import {AuthorModel} from "./author.model";

/**
 *
 * @param state {Object.<string, AuthorModel>}
 * @param action {{type: string, payload: AuthorModel|*}}
 * @returns {*}
 */
export function authorById(state = {}, action) {
  switch (action.type) {
    case CONNECT:
      const author = action.payload;
      if (!(author instanceof AuthorModel)) {
        throw new Error('action payload is not an author');
      }
      return Object.assign({}, state, {
        [author.id]: author
      });
    default: return state;
  }
}