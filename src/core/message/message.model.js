import moment from 'moment-timezone';
import {AuthorModel} from "../author/author.model";

export class MessageModel {
  /**
   *
   * @param text {string}
   * @param author {AuthorModel}
   */
  constructor(text, author) {
    if (!(author instanceof AuthorModel)) {
      throw new Error('author is not instance of AuthorModel');
    }
    this.text = text;
    this.author = author;
    this.timestamp = new Date().valueOf();
  }

  /**
   *
   * @returns {*}
   */
  getDate(tz) {
    return moment.tz(this.timestamp, this.author.locale).tz(tz).format('ddd D/MM HH:mm');
  }

  /**
   *
   * @returns {number}
   */
  get id() {
    return this.timestamp;
  }
}