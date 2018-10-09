import {CONNECT} from "./author.actions";


export function authorById(state = {}, action) {
  switch (action.type) {
    case CONNECT:
      const author = action.payload;
      return Object.assign({}, state, {
        [author.id]: author
      });
    default: return state;
  }
}