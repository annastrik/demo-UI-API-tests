import BasePage from './BasePage';
import { notifications } from '../fixtures/assert';
import helper from '../helper.js';

class ShoppingCartPage extends BasePage {

  get heading() {
    return browser.$('//h1').getText();
  }

  get productsInShopCartCount(){
    return browser.$$('//div[@class="cartItem ag-item gtm-product-auto"]').length;
  }

  get deleteProductIcon(){
    return browser.$('//div[@class="itemDelete"]//*[@class="itemDelete__icon"]');
  }

  get emptyCartMsg(){
    return browser.$('//div[@class="cartEmpty"]//p[@class="header-1"]').getText();
  }

  get updateCartBtn() {
    return browser.$('//button[@class="updateCartButton btn btn-mini btn-ui pull-right"]');
  }

  get emptyCartBtn() {
    return browser.$('//a[contains(@class, "emptyCartButton")]');
  }

  get confirmEmptyCart() {
    return browser.$('//div[@class="modal-footer"]//button[text()="Empty Cart"]');
  }

  get checkoutBtn() {
    return browser.$('.standardCheckoutButton');
  }

  lastProductInShopCart(index) {
    return browser.$(`//div[@data-cart-item-id][${index}]//div[@class="cartItem ag-item gtm-product-auto"]`);
    //the same using css: return browser.$(`.cartItemWrapper:nth-child(${index})`).$('.gtm-product-auto');
  }

  lastItemIdInShopCart(index) {
    this.lastProductInShopCart(index).waitForDisplayed();
    return this.lastProductInShopCart(index).getAttribute('data-itemnumber');
  }

  deleteProduct(){
    helper.clickElement(this.deleteProductIcon);
  }

  waitForEmptyCartMsg() {
    browser.waitUntil(() => this.emptyCartMsg === notifications.shoppingCart.emptyCart);
  }

  emptyCart(){
    helper.elementsAreLoaded([this.checkoutBtn]);
    helper.clickElement(this.emptyCartBtn);
    helper.clickElement(this.confirmEmptyCart);
    this.waitForEmptyCartMsg();
  }

  deleteProducts(number){
    for (let i = 1; i <= number; i++) {
      helper.elementsAreLoaded([this.checkoutBtn]);
      this.deleteProduct();
    }
  }
}
export default new ShoppingCartPage();
