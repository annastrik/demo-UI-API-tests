import BasePage from './BasePage';
import { pageTitles } from '../../_data/Webstaurantstore.com/resources.data';

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

  filterIsSelected(name) {
    return this.filterChkBox(name).isSelected();
  }

  get allProductsCount() {
    return browser.$('//a[@href="/43755/stainless-steel-enclosed-base-commercial-work-tables.html"]/label/span[2]').getText();
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
    browser.waitUntil(() => browser.getTitle() === pageTitles.shoppingCart);
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
