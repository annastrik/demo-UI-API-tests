import BasePage from './BasePage';

class ProductsListPage extends BasePage {

  get primeFilter() {
    return browser.$$('//i[@class="a-icon a-icon-checkbox"]')[0];
  }

  get primeFilterChkBox() {
    return browser.$$('//i[@class="a-icon a-icon-checkbox"]/../input[@type="checkbox"]')[0];
    //return browser.$('//span[text()="Sliding"]/../label[@class="wss-checkbox clearfix"]');
  }

  primeFilterApply() {
    super.clickElement(this.primeFilter);
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






  get productIdInProductsList() {
    return browser.$('//div[@class="ag-item gtm-product"][1]//*[@data-testid="itemNumber"]').getText().slice(1);
  }

  get productIconInProductsList() {
    return browser.$('//div[@class="ag-item gtm-product"][1]//a[@data-testid="itemDescription"]');
  }

  get shoppingCartBtn() {
    return browser.$('//div[@id="watnotif-wrapper"]//a[text()="View Cart"]');
  }







  get allProductsCount() {
    return browser.$('//span[text()="Sliding"]/../span[@class="count"]').getText();
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
