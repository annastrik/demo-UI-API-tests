import BasePage from './BasePage';

class HomePage extends BasePage {

  get tryForFreeBtn() {
    return browser.$('//div[contains(@class,"th-section")]//button[text()="Get Started"]');
  }

  get closeFrameBtn() {
    return browser.$('//*[@class="th-close-button"]');
  }

  closeWelcome(){
    super.clickElement(this.closeFrameBtn);
  }

  open() {
    super.open('https://www.tophap.com/');
    browser.maximizeWindow();
  }

  openMapAsTryForFree() {
    super.clickElement(this.tryForFreeBtn);
    this.closeWelcome();
  }
}
export default new HomePage();
