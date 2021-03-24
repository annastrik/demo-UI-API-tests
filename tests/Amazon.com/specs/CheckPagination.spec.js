import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import ProductsListPage from '../pages/ProductsListPage';
import { filters, pageTitles, search } from '../fixtures/assert';

describe('VERIFY PAGINATION FOR SEARCH RESULTS', () => {
  before('should open amazon.com', () => {
    HomePage.open();
  });

  it('should verify that page title is correct', () =>{
    expect(HomePage.title).eq(pageTitles.homePage);
  });

  it('should search for specific products', () =>{
    HomePage.submitSearch(search.searchWord1);
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

  it('should check if search results and number of pages are correct and pagination works properly', () =>{
    let actualProductsTotal = 0;
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
