import BasePage from './BasePage';

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

  get lightDutyFilter() {
    return browser.$('//span[text()="Light Duty"]/../label[@class="wss-checkbox clearfix"]');
  }

  get lightDutyFilterChkBox() {
    return browser.$('//span[text()="Light Duty"]/../label[@class="wss-checkbox clearfix"]/input[@type="checkbox"]');
  }

  get plusFilterIsSelected() {
    return this.plusFilterChkBox.isSelected();
  }

  get lightDutyFilterIsSelected() {
    return this.lightDutyFilterChkBox.isSelected();
  }

  get slidingDoorsFilter() {
    return browser.$('//span[text()="Sliding"]/../label[@class="wss-checkbox clearfix"]');
  }

  get slidingDoorsFilterChkBox() {
    return browser.$('//span[text()="Sliding"]/../label[@class="wss-checkbox clearfix"]/input[@type="checkbox"]');
  }

  get slidingDoorsFilterIsSelected() {
    return this.slidingDoorsFilterChkBox.isSelected();
  }

  get allProductsCount() {
    return browser.$('//span[text()="Sliding"]/../span[@class="count"]').getText();
  }

  get productsOnOnePageCount() {
    return browser.$$('//div[@class="ag-item gtm-product"]').length;
  }

  productDescription(index){
    return browser.$(`(//div[@class="ag-item gtm-product"])[${index}]//a[@data-testid="itemDescription"]`);
  }

  productDescriptionText(index){
    return this.productDescription(index).getText().toLowerCase();
  }

  get nextPageBtn(){
    return browser.$('//li[contains(@class, "rc-pagination-next")]');
  }

  get nextPageBtnIsNotActive(){
    return this.nextPageBtn.getAttribute('aria-disabled');
  }

  addToCartBtn(index) {
    return browser.$(`(//div[@class="ag-item gtm-product"])[${index}]//input[@name="addToCartButton"]`);
  }

  openProduct() {
    super.clickElement(this.productIconInProductsList);
  }

  addProductToCart(index){
    this.addToCartBtn(index).scrollIntoView();
    super.clickElement(this.addToCartBtn(index));
  }

  openShoppingCart() {
    super.clickElement(this.shoppingCartBtn);
    browser.waitUntil(() => browser.getTitle() === 'WebstaurantStore Cart');
  }

  plusFilterApply() {
    this.plusFilter.scrollIntoView();
    super.clickElement(this.plusFilter);
  }

  lightDutyFilterApply() {
    this.lightDutyFilter.scrollIntoView();
    super.clickElement(this.lightDutyFilter);
  }

  slidingDoorsFilterApply() {
    this.slidingDoorsFilter.scrollIntoView();
    super.clickElement(this.slidingDoorsFilter);
  }

  get productsOnLastPageCount() {
    return (+(String(+this.allProductsCount / 100).split('.')[1]));
  }

  scrollToPagination(){
    this.nextPageBtn.scrollIntoView();
  }

  goToNextPage(){
    super.clickElement(this.nextPageBtn);
  }
}
export default new ProductsListPage();
