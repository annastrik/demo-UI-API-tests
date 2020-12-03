import BasePage from './BasePage';
import {expect} from 'chai';
import { titleTxt } from '../../_data/Amazon.com/homePage.data';

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
    super.open('https://www.amazon.com/');
    expect(this.title).eq(titleTxt);
    browser.maximizeWindow();
  }

  submitSearch(name) {
    this.search.setValue(name);
    super.clickElement(this.submitSearchBtn);
  }
}
export default new HomePage();
