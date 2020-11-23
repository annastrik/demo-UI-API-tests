import BasePage from './BasePage';

class ProductPage extends BasePage {

  get firstOpenedItemIdOnProductPage() {
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
    super.clickElement(this.addToCartBtn);
    browser.waitUntil(() => this.confirmationMsg.includes('added to your cart'));
  }
}
export default new ProductPage();
