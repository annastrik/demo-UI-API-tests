import BasePage from './BasePage';
import {expect} from 'chai';

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
    super.open('https://www.webstaurantstore.com/');
    expect(this.title).eq('WebstaurantStore: Restaurant Supplies & Foodservice Equipment');
    browser.maximizeWindow();
  }

  submitSearch(name) {
    this.search.setValue(name);
    super.clickElement(this.submitSearchBtn);
  }

  openCategory(name){
    super.clickElement(this.category(name));
    this.registerBtn.waitForDisplayed();
  }
}
export default new HomePage();
