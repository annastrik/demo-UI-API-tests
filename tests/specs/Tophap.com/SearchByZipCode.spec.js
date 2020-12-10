import {expect} from 'chai';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';

describe('SEARCH BY ZIP CODE Test', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  const ZIP_CODE = '94024';

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should search by zip code and apply filter', () => {
    MapPage.submitSearchApplyFilters(ZIP_CODE);
  });

  it('should verify that returned results are in searched zip code area', () => {
    let zipCodes = MapPage.getZipFromSearchItemResult;
    expect(zipCodes.length).above(0);
    expect(zipCodes.length).eq(zipCodes.filter(el=>el===ZIP_CODE).length);
  });
});
