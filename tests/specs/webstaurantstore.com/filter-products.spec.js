import {expect} from 'chai';
import HomePage from '../../_pages/webstaurantstore.com/HomePage';
import ProductsListPage from '../../_pages/webstaurantstore.com/ProductsListPage';

describe('FILTER FUNCTION', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should search for specific products', () => {
    HomePage.submitSearch('stainless steel table');
    HomePage.openCategory('Stainless Steel Work Tables with Undershelf');
  });

  it('should apply "Plus Eligible" filter on search result', () => {
    ProductsListPage.plusFilterApply();
    expect(ProductsListPage.plusFilterIsSelected).true;
  });

  it('should apply "Light Duty" filter on search result and check that no filter been removed', () => {
    ProductsListPage.lightDutyFilterApply();
    expect(ProductsListPage.lightDutyFilterIsSelected).true;
    expect(ProductsListPage.plusFilterIsSelected).true;
  });
});
