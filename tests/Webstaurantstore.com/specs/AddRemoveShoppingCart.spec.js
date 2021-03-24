import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import ProductsListPage from '../pages/ProductsListPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import { searchParams,productCategory, pageHeadings, pageTitles, productsCount } from '../fixtures/assert';

let productIdOnProductPage;

describe('ADD REMOVE SHOPPING CART', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should verify that page title is correct', () =>{
    expect(HomePage.title).eq(pageTitles.homePage);
  });

  it('should search for specific products, open product and verify the correct product`s page is opened', () => {
    HomePage.submitSearch(searchParams.search1[0]);
    HomePage.openCategory(productCategory.tablesWithUndershelf);
    const productIdInProductsList = ProductsListPage.productIdInProductsList;
    ProductsListPage.openProduct();
    productIdOnProductPage = ProductPage.getProductId;
    expect(productIdOnProductPage).eq(productIdInProductsList);
  });

  it('should verify the `add product to cart` process', () => {
    //add a product to shopping cart from Product Page and verify confirmation message:
    ProductPage.addProductToCart();
    ProductPage.returnToProductsList();
    //add ${productsCount-1} more products to shopping cart from Products List:
    ProductsListPage.addProductsToCart(productsCount);
    //open shopping cart and check heading:
    ProductsListPage.openShoppingCart();
    expect(ShoppingCartPage.heading).eq(pageHeadings.shoppingCart);
    //verify that the first added product is the last one in shopping cart:
    expect(ShoppingCartPage.lastItemIdInShopCart(productsCount)).eq(productIdOnProductPage);
    //verify that there are ${productsCount} products in shopping cart:
    expect(ShoppingCartPage.productsInShopCartCount).eq(productsCount);
  });

  it('should verify the `delete product from cart` process', () => {
    // delete ${productsCount-2} products from the shopping cart using 'x' icons:
    ShoppingCartPage.deleteProducts(productsCount-2);
    // delete the rest of the products from the shopping cart using `Empty Cart` button:
    ShoppingCartPage.emptyCart();
    // verify that shopping cart is empty:
    expect(ShoppingCartPage.productsInShopCartCount === 0).true;
  });
});
