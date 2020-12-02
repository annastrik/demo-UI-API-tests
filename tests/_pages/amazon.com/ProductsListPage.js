import BasePage from './BasePage';

class ProductsListPage extends BasePage {

  get header() {
    return browser.$('//div[@data-uuid]');
  }

  get pageIsUploaded() {
    return this.header.isDisplayed();
  }

  get primeFilter() {
    return browser.$('//li[@aria-label="Free Shipping by Amazon"]//i[@class="a-icon a-icon-checkbox"]');
  }

  get primeFilterChkBox() {
    return browser.$('//li[@aria-label="Free Shipping by Amazon"]//input[@type="checkbox"]');
  }

  get primeFilterIsSelected() {
    return this.primeFilterChkBox.isSelected();
  }

  filter(name) {
    return browser.$(`//span[text()="${name}"]`);
  }

  filterIsApplied(name) {
    return this.filter(name).getAttribute('class').includes('a-text-bold');
  }

  get productsOnOnePageCount() {
    return browser.$$('//div[@data-component-type="s-search-result" and not(contains(@class, "AdHolder"))]').length;
  }

  discountedPrice(index) {
    return browser.$(`(${'//div[@data-index]'})[${index}]//span[@class = "a-price a-text-price"]`);
  }

  discountedPriceValue(index) {
    return this.discountedPrice(index).getText().slice(1);
  }

  newPrice(index) {
    return browser.$(`(${'//div[@data-index]'})[${index}]//span[@class = "a-price"]`);
  }

  newPriceValue(index) {
    return this.newPrice(index).getText().replace(/\s/g, '.').slice(1);
  }

  discountExists(index) {
    return this.discountedPrice(index).isExisting();
  }

  discountPercent(index){
    return +((+this.discountedPriceValue(index) / +this.newPriceValue(index)).toFixed(2));
  }

  maxDiscountProductLink(index) {
    return $(`(${'//div[@data-index]'})[${index}]//a`).getAttribute('href');
  }

  get nextPageBtn(){
    return browser.$('//ul[@class="a-pagination"]//*[text() = "Next"]');
  }

  get nextPageBtnIsActive(){
    return this.nextPageBtn.getAttribute('class') !== 'a-disabled a-last';
  }

  get resultsInfo(){
    return browser.$('//h1//span');
  }

  get calculatedProductsTotal(){
    return +this.resultsInfo.getText().split(' ')[2];
  }

  get calculatedProductsPerPage(){
    return +this.resultsInfo.getText().split(' ')[0].split('-')[1];
  }

  get totalPages(){
    return Math.ceil(this.calculatedProductsTotal/this.calculatedProductsPerPage);
  }

  primeFilterApply() {
    super.clickElement(this.primeFilter);
  }

  filterApply(name) {
    super.clickElement(this.filter(name));
  }

  goToNextPage(){
    super.clickElement(this.nextPageBtn);
    browser.pause(1500);
  }
}
export default new ProductsListPage();
