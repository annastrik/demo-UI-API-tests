import BasePage from './BasePage';

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
    return browser.$('//div[@id="centerCol"]//div[@id="averageCustomerReviews"]').getAttribute('data-asin');
  }

  get shoppingCartBtn(){
    return browser.$('//a[@id="nav-cart"]');
  }

  get priceOnProductPage() {
    return browser.$('//*[@id="price_inside_buybox"]');
  }

  get checkoutBtn(){
    return browser.$('//span[@id="hlb-ptc-btn"]');
  }

  openProduct(url) {
    browser.url(url);
    this.header.waitForDisplayed();
  }

  selectSize(index) {
    this.sizeSelection.selectByIndex(index);
    this.priceOnProductPage.waitForDisplayed();
  }

  addProductToCart(){
    super.clickElement(this.addToCartBtn);
    this.checkoutBtn.waitForDisplayed();
  }

  openShoppingCart() {
    super.clickElement(this.shoppingCartBtn);
  }
}
export default new ProductPage();
