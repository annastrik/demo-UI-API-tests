import BasePage from './BasePage';
import { pageTitles } from '../fixtures/assert';

class ShoppingCartPage extends BasePage {

  get title() {
    return browser.getTitle();
  }

  get shoppingCartIsUploaded(){
    return browser.waitUntil(() => this.title === pageTitles.shoppingCart);
  }

  get productIdInShoppingCart() {
    return browser.$('//div[@data-name="Active Items"]//div[@data-asin]').getAttribute('data-asin');
  }
}
export default new ShoppingCartPage();
