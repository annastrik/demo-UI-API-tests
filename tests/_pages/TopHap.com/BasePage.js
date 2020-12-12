export default class BasePage {

  open(path) {
    browser.url(path);
  }

  clickElement(locator) {
    locator.waitForClickable();
    locator.click();
  }

  moveToElement(locator) {
    locator.waitForDisplayed();
    locator.moveTo();
  }

  moveToElementAndClick(locator) {
    locator.waitForDisplayed();
    locator.moveTo().click();
  }

  elementsAreLoaded(elements, timeout = 10000) {
    browser.waitUntil(() => {
      return this.getMissingElements(elements).length === 0;
    }, timeout, 'Items missing: ' +
        `${this.getMissingElements(elements)}. \n` +
        `Current url: ${browser.getUrl()}`);
    return true;
  }

  getMissingElements(elements) {
    return elements
      .filter((element) => !element.isDisplayed());
  }
}
