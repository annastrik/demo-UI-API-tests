import BasePage from './BasePage';
import helper from '../helper.js';

class ProductPage extends BasePage {

  get getProductId() {
    return browser.$('//div[@id="gtm-product-page"]').getAttribute('data-item-number');
  }

  get addToCartBtn() {
    return browser.$('//input[@id="buyButton"]');
  }

  get confirmationMsg() {
    return browser.$('//div[@class="amount-in-cart"]//div').getText();
  }

  addProductToCart(){
    this.addToCartBtn.scrollIntoView();
    helper.clickElement(this.addToCartBtn);
    browser.waitUntil(() => this.confirmationMsg.includes('added to your cart'));
  }

  returnToProductsList(){
    browser.back();
    helper.waitForPageLoaded();
  }
}
export default new ProductPage();
