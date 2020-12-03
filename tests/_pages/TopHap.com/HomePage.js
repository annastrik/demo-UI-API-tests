import BasePage from './BasePage';

class HomePage extends BasePage {

  get tryForFreeBtn() {
    return browser.$('//button[text()="Try for free"]');
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

  tryForFreeStart() {
    super.clickElement(this.tryForFreeBtn);
    this.closeWelcome();
  }
}
export default new HomePage();
