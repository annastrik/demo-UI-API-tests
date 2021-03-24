import BasePage from './BasePage';
import helper from '../helper.js';

class ProductsListPage extends BasePage {

  get productIdInProductsList() {
    return browser.$('//div[@class="ag-item gtm-product"][1]//*[@data-testid="itemNumber"]').getText().slice(1);
  }

  get productIconInProductsList() {
    return browser.$('//div[@class="ag-item gtm-product"][1]//a[@data-testid="itemDescription"]');
  }

  get shoppingCartBtn() {
    return browser.$('//div[@id="watnotif-wrapper"]//a[text()="View Cart"]');
  }

  get plusFilter() {
    return browser.$('//li[@data-createHttpPost="PlusFilter"]//label[@class="wss-checkbox clearfix"]');
  }

  get plusFilterChkBox() {
    return browser.$('//li[@data-createHttpPost="PlusFilter"]//input[@type="checkbox"]');
  }

  filter(name) {
    return browser.$(`//span[contains(text(),"${name}")]/../label`);
  }

  filterChkBox(name) {
    return browser.$(`//span[contains(text(),"${name}")]/../label//input[@type="checkbox"]`);
  }

  productsNrShowingOnPage(name) {
    return browser.$(`//span[contains(text(),"${name}")]/../span[2]`).getText();
  }

  get productsList() {
    return browser.$$('.ag-item');
  }

  get productsOnOnePageCount() {
    return this.productsList.length;
  }

  productDescription() {
    let result = [];
    result.push(...this.productsList.map(el=>el.$('.description').getText().toLowerCase()));
    return result;
  }

  get nextPageBtn() {
    return browser.$('//li[contains(@class, "rc-pagination-next")]');
  }

  get nextPageBtnIsNotActive() {
    return this.nextPageBtn.getAttribute('aria-disabled');
  }

  addToCartBtn(index) {
    return browser.$(`//div[@class="ag-item gtm-product"][${index}]//input[@name="addToCartButton"]`);
  }

  openProduct() {
    helper.clickElement(this.productIconInProductsList);
    helper.waitForPageLoaded();
  }

  filterIsSelected(name) {
    return this.filterChkBox(name).isSelected();
  }

  addProductToCart(index) {
    this.addToCartBtn(index).scrollIntoView();
    helper.clickElement(this.addToCartBtn(index));
  }

  openShoppingCart() {
    helper.clickElement(this.shoppingCartBtn);
    helper.waitForPageLoaded();
  }

  filterApply(name) {
    this.filter(name).scrollIntoView();
    helper.clickElement(this.filter(name));
  }

  productsNrShowingOnLastPg(name) {
    return (+(String(+this.productsNrShowingOnPage(name) / 100).split('.')[1]));
  }

  scrollToPagination() {
    this.nextPageBtn.scrollIntoView();
  }

  goToNextPage() {
    helper.clickElement(this.nextPageBtn);
  }

  addProductsToCart(number) {
    for (let i = 2; i <= number; i++) {
      if (this.addToCartBtn(i).isExisting()) {  // some products might be sold out
        this.addProductToCart(i);
      }
    }
  }
}

export default new ProductsListPage();
