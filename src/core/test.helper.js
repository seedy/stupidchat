export class TestHelper {
  /**
   *
   * @param context {{}}
   */
  static clearContext(context) {
    Object.keys(context).forEach((key) => delete context[key]);
  }
}