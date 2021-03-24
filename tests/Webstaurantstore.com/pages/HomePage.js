import BasePage from './BasePage';
import { homeUrl } from '../fixtures/sitemap';
import helper from '../helper.js';

class HomePage extends BasePage {

  get title() {
    return browser.getTitle();
  }

  get search() {
    return browser.$('//input[@id="searchval"]');
  }

  get submitSearchBtn() {
    return browser.$('//button[@type="submit"]');
  }

  category(name) {
    return browser.$(`//div/a[@title="${name}"]`);
  }

  get registerBtn() {
    return browser.$('//a[@data-testid="register-nav-link"]');
  }

  open() {
    super.open(homeUrl);
    helper.waitForPageLoaded();
    browser.maximizeWindow();
  }

  submitSearch(name) {
    this.search.setValue(name);
    helper.clickElement(this.submitSearchBtn);
  }

  openCategory(name){
    helper.clickElement(this.category(name));
    this.registerBtn.waitForDisplayed();
  }
}
export default new HomePage();
