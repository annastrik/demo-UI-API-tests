import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import ProductsListPage from '../pages/ProductsListPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import { pageTitles, search } from '../fixtures/assert';

describe('SEARCH FOR MAXIMUM DISCOUNT', () => {
  before('should open amazon.com', () => {
    HomePage.open();
  });

  it('should verify that page title is correct', () =>{
    expect(HomePage.title).eq(pageTitles.homePage);
  });

  it('should search for specific products', () =>{
    HomePage.submitSearch(search.searchWord2);
    expect(ProductsListPage.pageIsUploaded).true;
  });

  it('should apply `prime` filter on search result', () =>{
    ProductsListPage.primeFilterApply();
    expect(ProductsListPage.primeFilterIsSelected).true;
  });

  it('should find the product with the maximum discount, add it to bag and check that correct product is in Shop bag', () =>{
    const maxDiscountProductLink = ProductsListPage.findMaxDiscountProduct;
    ProductPage.openProduct(maxDiscountProductLink);
    const productIdOnProductPage = ProductPage.getIdAndAddToCart;
    ProductPage.openShoppingCart();
    expect(ShoppingCartPage.shoppingCartIsUploaded).true;
    expect((ShoppingCartPage.productIdInShoppingCart).includes(productIdOnProductPage)).true;
  });
});

