import BasePage from './BasePage';
import {expect} from 'chai';
import { pageTitles } from '../../_data/Amazon.com/resources.data';

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
    expect(this.title).eq(pageTitles.homePage);
    browser.maximizeWindow();
  }

  submitSearch(name) {
    this.search.setValue(name);
    super.clickElement(this.submitSearchBtn);
  }
}
export default new HomePage();
