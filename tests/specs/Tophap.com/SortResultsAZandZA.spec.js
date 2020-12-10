import {expect} from 'chai';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';

describe('Sort A-Z and Z-A Price Test', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  const ZIP_CODE = '94518';

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should search by zip code and sort the results from smallest to biggest', () => {
    MapPage.submitSearchApplySortingAndFiltersAZ(ZIP_CODE);
  });

  it('should verify that items in search result are ordered from smallest to biggest', () => {
    let prevPrice = 0;
    let prices = MapPage.getPriceFromSearchItemResult;
    expect(prices.length).above(0);
    prices.forEach(currentPrice=>{expect(currentPrice).at.least(prevPrice);
      prevPrice = currentPrice;
    });
  });

  it('should search by zip code and sort the results from biggest to smallest', () => {
    MapPage.submitSearchApplySortingAndFiltersZA(ZIP_CODE);
  });

  it('should verify that items in search result are ordered from biggest to smallest', () => {
    let prevPrice = Infinity;
    let prices = MapPage.getPriceFromSearchItemResult;
    expect(prices.length).above(0);
    prices.forEach(currentPrice=>{expect(currentPrice).at.most(prevPrice);
      prevPrice = currentPrice;
    });
  });
});
