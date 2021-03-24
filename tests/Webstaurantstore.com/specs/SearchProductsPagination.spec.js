import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import ProductsListPage from '../pages/ProductsListPage';
import {searchParams, productCategory, filters, pageTitles} from '../fixtures/assert';

describe('PRODUCT SEARCH AND FILTER', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should verify that page title is correct', () =>{
    expect(HomePage.title).eq(pageTitles.homePage);
  });

  it('should search for products and apply filter', () => {
    HomePage.submitSearch(searchParams.search1[0]);
    HomePage.openCategory(productCategory.enclosedBaseCommercial);
    ProductsListPage.filterApply(filters.slidingDoors);
    expect(ProductsListPage.filterIsSelected(filters.slidingDoors)).true;
  });

  it('should check if search results and number of pages are correct', () => {
    while (true) {
      const productsOnOnePageCount = ProductsListPage.productsOnOnePageCount;
      // verify that each product in search results has "table" in description:
      expect(ProductsListPage.productDescription().every(el=>el.includes(searchParams.search1[1]))).true;
      ProductsListPage.scrollToPagination();
      // we go to the next page while "Next" button is active:
      if (ProductsListPage.nextPageBtnIsNotActive === 'false') {
        // we check that total number of products on each page (except the last one) is equal 100:
        expect(productsOnOnePageCount).eq(100);
        ProductsListPage.goToNextPage();
      } else {
        // we check that total number of products on the last page is correct:
        expect(productsOnOnePageCount).eq(ProductsListPage.productsNrShowingOnLastPg(filters.slidingDoors));
        break;
      }
    }
  });
});
