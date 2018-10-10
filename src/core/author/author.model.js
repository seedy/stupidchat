export class AuthorModel {
  /**
   *
   * @type {Object.<string, string>}
   */
  static tzs = {
    paris: 'Europe/Paris',
    chicago: 'America/Chicago'
  };

  /**
   *
   * @param city
   * @returns {string}
   */
  static cityToLocale(city) {
    return AuthorModel.tzs[city];
  }

  /**
   *
   * @param id string
   * @param name string
   * @param surname string
   * @param city string
   * @param locale string
   */
  constructor(id, name, surname, city, locale) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.city = city;
    this.locale = locale;
  }

  /**
   *
   * @param author {AuthorModel|number}
   * @returns {boolean}
   */
  isSame(author) {
    if (author instanceof AuthorModel) {
      return this.id === author.id;
    }
    if (typeof author === 'number') {
      return this.id === author;
    }
    return false;
  }

  /**
   * @returns {string}
   */
  toString() {
    return this.name + ' ' + this.surname;
  }

  /**
   *
   * @returns {*}
   */
  getInitial() {
    return this.name[0];
  }
}