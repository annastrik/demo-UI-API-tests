module.exports = {

  clickElement: function(locator) {
    locator.waitForClickable();
    locator.click();
  },

  moveToElement: function(locator) {
    locator.waitForDisplayed();
    locator.moveTo();
  },

  movingIsFinished: function(element) {
    let x = 0;
    let y = 0;
    while (element.isDisplayed()) {
      let location = element.getLocation();
      if (x === location.x && y === location.y) {
        return element;
      }
      x = location.x;
      y = location.y;
    }
  },

  elementsAreLoaded: function(elements, timeout = 10000) {
    browser.waitUntil(() => {
      return this.getMissingElements(elements).length === 0;
    }, timeout, 'Items missing: ' +
            `${this.getMissingElements(elements)}. \n` +
            `Current url: ${browser.getUrl()}`);
    return true;
  },

  getMissingElements: function(elements) {
    return elements
      .filter((element) => !element.isDisplayed());
  },

  waitForPageLoaded: function() {
    browser.waitUntil(() => {
      const state = browser.execute(() =>
        document.readyState);
      return state === 'complete';
    }, {timeout: 10000});
  },
};
