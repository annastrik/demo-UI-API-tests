import {expect} from 'chai';
import HomePage from '../../_pages/amazon.com/HomePage';
import ProductsListPage from '../../_pages/amazon.com/ProductsListPage';
import { filters } from '../../_data/amazon.com/productsListPage.data';
import { searchWords } from '../../_data/amazon.com/homePage.data';

describe('VERIFY PAGINATION FOR SEARCH RESULTS', () => {
  before('should open amazom.com', () => {
    HomePage.open();
  });

  it('should search for specific products', () =>{
    HomePage.submitSearch(searchWords.s1);
    expect(ProductsListPage.pageIsUploaded).true;
  });

  it('should apply `Last 30 days` filter on search result', () =>{
    ProductsListPage.filterApply(filters.newArrival);
    expect(ProductsListPage.filterIsApplied(filters.newArrival)).true;
  });

  it('should apply `Cool Mist` filter on search result', () =>{
    ProductsListPage.filterApply(filters.coolMist);
    expect(ProductsListPage.filterIsApplied(filters.coolMist)).true;
  });

  let actualProductsTotal = 0;

  it('should check if search results and number of pages are correct and pagination works properly', () =>{
    const calculatedProductsTotal = ProductsListPage.calculatedProductsTotal;
    const calculatedProductsPerPage = ProductsListPage.calculatedProductsPerPage;
    const totalPages = ProductsListPage.totalPages;
    for (let i = 1; i < totalPages; i++) {
      actualProductsTotal += ProductsListPage.productsOnOnePageCount;
      expect(ProductsListPage.productsOnOnePageCount).eq(calculatedProductsPerPage);
      ProductsListPage.goToNextPage();
    }
    actualProductsTotal += ProductsListPage.productsOnOnePageCount;
    expect(calculatedProductsTotal).eq(actualProductsTotal);
  });
});
