import BasePage from './BasePage';
import { homeUrl } from '../fixtures/sitemap';
import helper from '../helper.js';

class HomePage extends BasePage {

  get title() {
    return browser.getTitle();
  }

  get search() {
    return browser.$('//input[@id="twotabsearchtextbox"]');
  }

  get submitSearchBtn() {
    return browser.$('//input[@type="submit"]');
  }

  open() {
    super.open(homeUrl);
    browser.maximizeWindow();
  }

  submitSearch(name) {
    this.search.setValue(name);
    helper.clickElement(this.submitSearchBtn);
  }
}
export default new HomePage();
