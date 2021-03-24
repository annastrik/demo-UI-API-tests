import BasePage from './BasePage';
import helper from '../helper.js';
import { homeUrl } from '../fixtures/sitemap';

class HomePage extends BasePage {

  get tryForFreeBtn() {
    return browser.$('//div[contains(@class,"th-section")]//button[text()="Get Started"]');
  }

  get closeFrameBtn() {
    return browser.$('//*[@class="th-close-button"]');
  }

  closeWelcome(){
    helper.clickElement(this.closeFrameBtn);
  }

  open() {
    super.open(homeUrl);
    helper.waitForPageLoaded();
    browser.maximizeWindow();
  }

  openMapAsTryForFree() {
    helper.clickElement(this.tryForFreeBtn);
    helper.waitForPageLoaded();
    this.closeWelcome();
  }
}
export default new HomePage();
