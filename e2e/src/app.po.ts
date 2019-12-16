import { browser, by, element } from 'protractor';

/**
 * This class is to run End to end testing (E2E) or intergration test
 * @export
 * @class AppPage
 */
export class AppPage {
  /**
   * This method is to navigate browser to specific url
   * @returns
   * @memberof AppPage
   */
  navigateTo() {
    return browser.get('/');
  }

  /**
   * This method is to get page title
   * @returns
   * @memberof AppPage
   */
  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }
}
