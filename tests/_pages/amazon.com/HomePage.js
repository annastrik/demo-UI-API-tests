import BasePage from './BasePage';
import {expect} from 'chai';

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

  category(name) {
    return browser.$(`//div/a[@title="${name}"]`);
  }

  get registerBtn() {
    return browser.$('//a[@data-testid="register-nav-link"]');
  }

  open() {
    super.open('https://www.amazon.com/');
    browser.pause(1000);
    expect(this.title).eq('Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more');
    browser.maximizeWindow();
  }

  submitSearch(name) {
    this.search.setValue(name);
    browser.pause(500);
    super.clickElement(this.submitSearchBtn);
    browser.pause(500);
  }






  openCategory(name){
    super.clickElement(this.category(name));
    this.registerBtn.waitForDisplayed();
  }
}
export default new HomePage();
