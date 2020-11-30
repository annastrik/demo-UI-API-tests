import BasePage from './BasePage';

class ProductsListPage extends BasePage {

  get header() {
    return browser.$('//div[@data-uuid]');
  }

  get pageIsUploaded() {
    return this.header.isDisplayed();
  }

  get primeFilter() {
    return browser.$$('//i[@class="a-icon a-icon-checkbox"]')[0];
  }

  get primeFilterChkBox() {
    return browser.$$('//i[@class="a-icon a-icon-checkbox"]/../input[@type="checkbox"]')[0];
  }

  get primeFilterIsSelected() {
    return this.primeFilterChkBox.isSelected();
  }

  get productsOnOnePageCount() {
    return browser.$$('//div[@data-index]').length;
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

  primeFilterApply() {
    super.clickElement(this.primeFilter);
    browser.pause(1000);
  }

  goToNextPage(){
    super.clickElement(this.nextPageBtn);
    browser.pause(1500);
  }
}
export default new ProductsListPage();
