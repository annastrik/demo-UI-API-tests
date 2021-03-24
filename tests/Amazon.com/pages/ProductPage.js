import BasePage from './BasePage';
import helper from '../helper.js';

class ProductPage extends BasePage {

  get header() {
    return browser.$('//h1[@id="title"]');
  }

  get sizeSelection() {
    return browser.$('//select[@id="native_dropdown_selected_size_name"]');
  }

  get sizeSelectionAvailable() {
    return this.sizeSelection.isExisting();
  }

  get productAvailable() {
    return this.addToCartBtn.isExisting();
  }

  get addToCartBtn() {
    return browser.$('//input[@id="add-to-cart-button"]');
  }

  get productIdOnProductPage() {
    //these selectors are constantly changing on amazon page
    return browser.$('//div[@id="centerCol"]//div[@id="averageCustomerReviews"]').getAttribute('data-asin');
    //return browser.$('//div[@id="ppd"]//div[@id="mbc"]').getAttribute('data-asin');
  }

  get shoppingCartBtn() {
    return browser.$('//a[@id="nav-cart"]');
  }

  get priceOnProductPage() {
    return browser.$('//*[@id="price_inside_buybox"]');
  }

  get checkoutBtn() {
    return browser.$('//span[@id="hlb-ptc-btn"]');
  }

  openProduct(url) {
    super.open(url);
    this.header.waitForDisplayed();
  }

  selectSize(index) {
    this.sizeSelection.selectByIndex(index);
    this.priceOnProductPage.waitForDisplayed();
  }

  addProductToCart() {
    helper.clickElement(this.addToCartBtn);
    this.checkoutBtn.waitForDisplayed();
  }

  openShoppingCart() {
    helper.clickElement(this.shoppingCartBtn);
  }

  get getIdAndAddToCart() {
    let productIdOnProductPage;
    /* There are several options on amazon product page that affect the scenarios the product is added to the cart:
         - sometimes there is `size` selection on a product page, sometimes not - thus the first `if` is added below;
         - sometimes selected size is unavailable, so `Add to cart` button does not show - thus the second `if` is added and
         a loop that keeps selecting other size until one becomes available and `Add to cart`button appears.
         */
    if (this.sizeSelectionAvailable) {
      for (let i = 1; i < 10; i++) {
        this.selectSize(i);
        if (this.productAvailable) {
          productIdOnProductPage = this.productIdOnProductPage;
          this.addProductToCart();
          break;
        }
      }
    } else {
      this.addProductToCart();
    } return productIdOnProductPage;
  }
}
export default new ProductPage();
