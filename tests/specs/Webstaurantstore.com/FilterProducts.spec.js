import {expect} from 'chai';
import HomePage from '../../_pages/Webstaurantstore.com/HomePage';
import ProductsListPage from '../../_pages/Webstaurantstore.com/ProductsListPage';
import { searchWords, category } from '../../_data/Webstaurantstore.com/homePage.data';
import { filters } from '../../_data/Webstaurantstore.com/productsListPage.data';

describe('FILTER FUNCTION', () => {
  before('should open www.webstaurantstore.com', () => {
    HomePage.open();
  });

  it('should search for specific products', () => {
    HomePage.submitSearch(searchWords.s1);
    HomePage.openCategory(category.tablesWithUndershelf);
  });

  it('should apply "Plus Eligible" filter on search result', () => {
    ProductsListPage.plusFilterApply();
    expect(ProductsListPage.plusFilterIsSelected).true;
  });

  it('should apply "Light Duty" filter on search result and check that no filter been removed', () => {
    ProductsListPage.filterApply(filters.lightDuty);
    expect(ProductsListPage.filterIsSelected(filters.lightDuty)).true;
    expect(ProductsListPage.plusFilterIsSelected).true;
  });
});
