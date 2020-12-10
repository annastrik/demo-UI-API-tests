import {expect} from 'chai';
import HomePage from '../../_pages/Webstaurantstore.com/HomePage';
import ProductsListPage from '../../_pages/Webstaurantstore.com/ProductsListPage';
import ProductPage from '../../_pages/Webstaurantstore.com/ProductPage';
import ShoppingCartPage from '../../_pages/Webstaurantstore.com/ShoppingCartPage';
import { searchWords, category } from '../../_data/Webstaurantstore.com/homePage.data';
import { headingTxt } from '../../_data/Webstaurantstore.com/shoppingCartPage.data';

describe('ADD REMOVE SHOPPING CART', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  let firstOpenedItemIdOnProductPage;
  let addedProductsCount = 0;
  const nr = 4;

  it('should search for specific products', () => {
    HomePage.submitSearch(searchWords.s1);
    HomePage.openCategory(category.tablesWithUndershelf);
  });

  it('should click on a product in the list and verify the correct product`s page is opened', () => {
    const productIdInProductsList = ProductsListPage.productIdInProductsList;
    ProductsListPage.openProduct();
    firstOpenedItemIdOnProductPage = ProductPage.firstOpenedItemIdOnProductPage;
    expect(firstOpenedItemIdOnProductPage).eq(productIdInProductsList);
  });

  it('should add a product to shopping cart from product page and verify confirmation message', () => {
    ProductPage.addProductToCart();
    addedProductsCount++;
    browser.back();
  });

  it(`should add ${nr-1} more products to shopping cart from products list`, () => {
    addedProductsCount += ProductsListPage.addProductsToCart(nr-1);
  });

  it('should open shopping cart', () => {
    ProductsListPage.openShoppingCart();
    expect(ShoppingCartPage.heading).eq(headingTxt);
  });

  it('should verify the first added product is the last one in shopping cart', () => {
    expect(ShoppingCartPage.lastItemIdInShopCart(addedProductsCount)).eq(firstOpenedItemIdOnProductPage);
  });

  it(`should verify there are ${nr} products in shopping cart`, () => {
    expect(ShoppingCartPage.productsInShopCartCount).eq(nr);
  });

  it(`should delete ${nr-2} products from the shopping cart using 'x' icons`, () => {
    ShoppingCartPage.deleteProducts(nr-2);
  });

  it('should delete the rest of the products from the shopping cart using `Empty Cart` button', () => {
    ShoppingCartPage.emptyCart();
    expect(ShoppingCartPage.lastProductInShopCartExists(addedProductsCount)).false;
  });
});
