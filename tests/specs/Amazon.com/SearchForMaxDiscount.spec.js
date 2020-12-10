import {expect} from 'chai';
import HomePage from '../../_pages/Amazon.com/HomePage';
import ProductsListPage from '../../_pages/Amazon.com/ProductsListPage';
import ProductPage from '../../_pages/Amazon.com/ProductPage';
import ShoppingCartPage from '../../_pages/Amazon.com/ShoppingCartPage';

describe('SEARCH FOR MAXIMUM DISCOUNT', () => {
  before('should open amazom.com', () => {
    HomePage.open();
  });

  const SEARCH_WORD = 'running shoes';
  let maxDiscountProductLink;
  let productIdOnProductPage;

  it('should search for specific products', () =>{
    HomePage.submitSearch(SEARCH_WORD);
    expect(ProductsListPage.pageIsUploaded).true;
  });

  it('should apply `prime` filter on search result', () =>{
    ProductsListPage.primeFilterApply();
    expect(ProductsListPage.primeFilterIsSelected).true;
  });

  it('should find the product with the maximum discount %', () =>{
    maxDiscountProductLink = ProductsListPage.findMaxDiscountProduct;
  });

  it('should open the product with maximum discount and add it to bag', () =>{
    ProductPage.openProduct(maxDiscountProductLink);
    productIdOnProductPage = ProductPage.addProductToCartProcess;
  });

  it('should check that the correct item has been added to the cart', () =>{
    ProductPage.openShoppingCart();
    expect(ShoppingCartPage.shoppingCartIsUploaded).true;
    expect((ShoppingCartPage.productIdInShoppingCart).includes(productIdOnProductPage)).true;
  });
});
