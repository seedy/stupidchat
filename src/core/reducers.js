import {combineReducers} from 'redux';
import {AuthorModel} from "./author/author.model";
import {typing, unread, history} from "./message/message.reducer";
import {authorById} from "./author/author.reducer";

const left = 1;
const right = 2;

const leftReducers = {
  typing1: typing(left),
  unread1: unread(left),
};

const rightReducers = {
  typing2: typing(right),
  unread2: unread(right)
};

const reducers = Object.assign(leftReducers, rightReducers, {history, authorById});
export default combineReducers(reducers);