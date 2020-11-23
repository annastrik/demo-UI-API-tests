import {expect} from 'chai';
import HomePage from '../../_pages/webstaurantstore.com/HomePage';
import ProductsListPage from '../../_pages/webstaurantstore.com/ProductsListPage';

describe('PRODUCT SEARCH AND FILTER', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should search for specific products', () => {
    HomePage.submitSearch('stainless steel table');
    HomePage.openCategory('Stainless Steel Enclosed Base Commercial Work Tables');
  });

  it('should apply "Sliding Doors" filter on search result', () => {
    ProductsListPage.slidingDoorsFilterApply();
    expect(ProductsListPage.slidingDoorsFilterIsSelected).true;
  });

  it('should check if search results and number of pages are correct', () => {
    while (true) {
      const productsOnOnePageCount = ProductsListPage.productsOnOnePageCount;
      // verify that each product in search results has "table" in description:
      for (let i = 1; i <= productsOnOnePageCount; i++) {
        ProductsListPage.elementsAreLoaded([ProductsListPage.productDescription(i)]);
        expect(ProductsListPage.productDescriptionText(i)).to.include('table');
      }
      ProductsListPage.scrollToPagination();
      // we go to the next page while "Next" button is active:
      if (ProductsListPage.nextPageBtnIsNotActive === 'false') {
        // we check that total number of products on each page (except the last one) is equal 100:
        expect(productsOnOnePageCount).eq(100);
        ProductsListPage.goToNextPage();
      } else {
        // we check that total number of products on the last page is correct:
        expect(productsOnOnePageCount).eq(ProductsListPage.productsOnLastPageCount);
        break;
      }
    }
  });
});
