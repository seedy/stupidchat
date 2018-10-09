import moment from 'moment-timezone';

export class MessageModel {
  /**
   *
   * @param text
   * @param author
   */
  constructor(text, author) {
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