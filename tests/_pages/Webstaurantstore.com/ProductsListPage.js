import BasePage from './BasePage';
import { titleTxt } from '../../_data/Webstaurantstore.com/shoppingCartPage.data';
import ShoppingCartPage from "./ShoppingCartPage";

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
    return browser.$('//li[@data-test="PlusFilter"]//label[@class="wss-checkbox clearfix"]');
  }

  get plusFilterChkBox() {
    return browser.$('//li[@data-test="PlusFilter"]//input[@type="checkbox"]');
  }

  get plusFilterIsSelected() {
    return this.plusFilterChkBox.isSelected();
  }

  filter(name) {
    return browser.$(`//span[text()="${name}"]/../label[@class="wss-checkbox clearfix"]`);
  }

  filterChkBox(name) {
    return browser.$(`//span[text()="${name}"]/../label[@class="wss-checkbox clearfix"]/input[@type="checkbox"]`);
  }

  filterIsSelected(name) {
    return this.filterChkBox(name).isSelected();
  }

  get allProductsCount() {
    return browser.$('//span[text()="Sliding"]/../span[@class="count"]').getText();
  }

  get productsOnOnePageCount() {
    return browser.$$('//div[@class="ag-item gtm-product"]').length;
  }

  productDescription(index) {
    return browser.$(`(//div[@class="ag-item gtm-product"])[${index}]//a[@data-testid="itemDescription"]`);
  }

  productDescriptionText(index) {
    return this.productDescription(index).getText().toLowerCase();
  }

  get nextPageBtn() {
    return browser.$('//li[contains(@class, "rc-pagination-next")]');
  }

  get nextPageBtnIsNotActive() {
    return this.nextPageBtn.getAttribute('aria-disabled');
  }

  addToCartBtn(index) {
    return browser.$(`(//div[@class="ag-item gtm-product"])[${index}]//input[@name="addToCartButton"]`);
  }

  openProduct() {
    super.clickElement(this.productIconInProductsList);
  }

  addProductToCart(index) {
    this.addToCartBtn(index).scrollIntoView();
    super.clickElement(this.addToCartBtn(index));
  }

  openShoppingCart() {
    super.clickElement(this.shoppingCartBtn);
    browser.waitUntil(() => browser.getTitle() === titleTxt);
  }

  plusFilterApply() {
    this.plusFilter.scrollIntoView();
    super.clickElement(this.plusFilter);
  }

  filterApply(name) {
    this.filter(name).scrollIntoView();
    super.clickElement(this.filter(name));
  }

  get productsOnLastPageCount() {
    return (+(String(+this.allProductsCount / 100).split('.')[1]));
  }

  scrollToPagination() {
    this.nextPageBtn.scrollIntoView();
  }

  goToNextPage() {
    super.clickElement(this.nextPageBtn);
  }

  addProductsToCart(number) {
    let addedProductsCount = 0;
    for (let i = 2; addedProductsCount < number; i++) {
      if (this.addToCartBtn(i).isExisting()) {  // some products might be sold out
        this.addProductToCart(i);
        addedProductsCount++;
      }
    } return addedProductsCount;
  }
}

export default new ProductsListPage();
