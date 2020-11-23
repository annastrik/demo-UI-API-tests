import {expect} from 'chai';
import HomePage from '../_pages/HomePage';
import ProductsListPage from '../_pages/ProductsListPage';
import ProductPage from '../_pages/ProductPage';
import ShoppingCartPage from '../_pages/ShoppingCartPage';

describe('ADD REMOVE SHOPPING CART', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  let firstOpenedItemIdOnProductPage;
  let addedProductsCount = 0;

  it('should search for specific products', () => {
    HomePage.submitSearch('stainless steel table');
    HomePage.openCategory('Stainless Steel Work Tables with Undershelf');
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

  it('should add 3 more products to shopping cart from products list', () => {
    for (let i = 2; addedProductsCount <= 3; i++) {
      if (ProductsListPage.addToCartBtn(i).isExisting()){  // some products might be sold out
        ProductsListPage.addProductToCart(i);
        addedProductsCount++;
      }
    }
  });

  it('should open shopping cart', () => {
    ProductsListPage.openShoppingCart();
    expect(ShoppingCartPage.heading).eq('Cart');
  });

  it('should verify the first added product is the last one in shopping cart', () => {
    expect(ShoppingCartPage.lastItemIdInShopCart(addedProductsCount)).eq(firstOpenedItemIdOnProductPage);
  });

  it('should verify there are 4 products in shopping cart', () => {
    expect(ShoppingCartPage.productsInShopCartCount).eq(4);
  });

  it('should delete 2 products from the shopping cart using `x` icons', () => {
    for (let i = 1; i <= 2; i++) {
      ShoppingCartPage.elementsAreLoaded([ShoppingCartPage.checkoutBtn]);
      ShoppingCartPage.deleteProduct();
    }
  });

  it('should delete the rest of the products from the shopping cart using `Empty Cart` button', () => {
    ShoppingCartPage.elementsAreLoaded([ShoppingCartPage.checkoutBtn]);
    ShoppingCartPage.emptyCart();
    expect(ShoppingCartPage.lastProductInShopCartExists(addedProductsCount)).false;
  });
});
