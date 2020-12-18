import {expect} from 'chai';
import HomePage from '../../_pages/Webstaurantstore.com/HomePage';
import ProductsListPage from '../../_pages/Webstaurantstore.com/ProductsListPage';
import { productCategory, filters } from '../../_data/Webstaurantstore.com/resources.data';

describe('FILTER FUNCTION', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should search for specific products', () => {
    HomePage.submitSearch('stainless steel table');
    HomePage.openCategory(productCategory.tablesWithUndershelf);
  });

  it('should apply "Plus Eligible" filter on search result', () => {
    ProductsListPage.filterApply(filters.plusEligible);
    expect(ProductsListPage.filterIsSelected(filters.plusEligible)).true;
  });

  it('should apply "Light Duty" filter on search result and check that no filter been removed', () => {
    ProductsListPage.filterApply(filters.lightDuty);
    expect(ProductsListPage.filterIsSelected(filters.lightDuty)).true;
    expect(ProductsListPage.filterIsSelected(filters.plusEligible)).true;
  });
});
