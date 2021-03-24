import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import ProductsListPage from '../pages/ProductsListPage';
import {productCategory, filters, pageTitles, searchParams} from '../fixtures/assert';

describe('FILTER FUNCTION', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should verify that page title is correct', () =>{
    expect(HomePage.title).eq(pageTitles.homePage);
  });

  it('should search for products and apply filter', () => {
    HomePage.submitSearch(searchParams.search1[0]);
    HomePage.openCategory(productCategory.tablesWithUndershelf);
    ProductsListPage.filterApply(filters.plusEligible);
    expect(ProductsListPage.filterIsSelected(filters.plusEligible)).true;
  });

  it('should apply another filter and check that first filter hasn`t been removed', () => {
    ProductsListPage.filterApply(filters.lightDuty);
    expect(ProductsListPage.filterIsSelected(filters.lightDuty)).true;
    expect(ProductsListPage.filterIsSelected(filters.plusEligible)).true;
  });
});
