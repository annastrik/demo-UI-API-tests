import {expect} from 'chai';
import HomePage from '../../_pages/amazon.com/HomePage';
import ProductsListPage from '../../_pages/amazon.com/ProductsListPage';
import ProductPage from '../../_pages/amazon.com/ProductPage';
import ShoppingCartPage from '../../_pages/amazon.com/ShoppingCartPage';

describe('SEARCH FOR MAXIMUM DISCOUNT', () => {
  before('should open amazom.com', () => {
    HomePage.open();
  });

  it('should search for specific products', () =>{
    HomePage.submitSearch('party heels');
    expect(ProductsListPage.pageIsUploaded).true;
  });

  it('should apply `prime` filter on search result', () =>{
    ProductsListPage.primeFilterApply();
    expect(ProductsListPage.primeFilterIsSelected).true;
  });

  let max = 0;
  let maxDiscountProductLink;
  let productIdOnProductPage;

  it('should find the product with the maximum discount %', () =>{
    /* the below loop takes all products on the page one by one and checks if there is the discounted price, if yes,
        it takes two prices (original and discounted) and calculates the percentage of discount, then it finds
        the product with the highest discount percentage on a page
        */
    while (true) {
      const productsOnOnePageCount = ProductsListPage.productsOnOnePageCount;
      for (let i = 1; i <= productsOnOnePageCount; i++) {
        if (ProductsListPage.discountExists(i)) {
          if (ProductsListPage.discountPercent(i) > max) {
            max = ProductsListPage.discountPercent(i);
            maxDiscountProductLink = ProductsListPage.maxDiscountProductLink(i);
          }
        }
      }
      if (ProductsListPage.nextPageBtnIsActive) {
        ProductsListPage.goToNextPage();
      } else {break;}
    }
  });

  it('should open the product with maximum discount and add it to bag', () =>{
    ProductPage.openProduct(maxDiscountProductLink);
    /* There are several options on amazon product page that affect the scenarios the product is added to the cart:
         - sometimes there is `size` selection on a product page, sometimes not - thus the first `if` is added below;
         - sometimes selected size is unavailable, so `Add to cart` button does not show - thus the second `if` is added and
         a loop that keeps selecting other size until one becomes available and `Add to cart`button appears.
         */
    if (ProductPage.sizeSelectionAvailable) {
      for (let i = 1; i < 10; i++) {
        ProductPage.selectSize(i);
        if (ProductPage.productAvailable) {
          productIdOnProductPage = ProductPage.productIdOnProductPage;
          ProductPage.addProductToCart();
          break;
        }
      }
    } else {
      ProductPage.addProductToCart();
    }
  });

  it('should check that the correct item has been added to the cart', () =>{
    ProductPage.openShoppingCart();
    expect(ShoppingCartPage.shoppingCartIsUploaded).true;
    expect((ShoppingCartPage.productIdInShoppingCart).includes(productIdOnProductPage)).true;
  });
});
