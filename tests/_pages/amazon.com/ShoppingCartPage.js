import BasePage from './BasePage';
import { titleTxt } from '../../_data/amazon.com/shoppingCartPage.data';

class ShoppingCartPage extends BasePage {

  get title() {
    return browser.getTitle();
  }

  get shoppingCartIsUploaded(){
    return browser.waitUntil(() => this.title === titleTxt);
  }

  get productIdInShoppingCart() {
    return browser.$('//div[@data-name="Active Items"]//div[@data-asin]').getAttribute('data-asin');
  }
}
export default new ShoppingCartPage();
