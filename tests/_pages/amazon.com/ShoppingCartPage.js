import BasePage from './BasePage';

class ShoppingCartPage extends BasePage {

  get title() {
    return browser.getTitle();
  }

  get shoppingCartIsUploaded(){
    return browser.waitUntil(() => this.title === 'Amazon.com Shopping Cart');
  }

  get productIdInShoppingCart() {
    return browser.$('//div[@data-name="Active Items"]//div[@data-asin]').getAttribute('data-asin');
  }
}
export default new ShoppingCartPage();
