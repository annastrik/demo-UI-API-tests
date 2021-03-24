module.exports = {

  clickElement: function(locator) {
    locator.waitForClickable({timeout: 10000});
    locator.click();
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
