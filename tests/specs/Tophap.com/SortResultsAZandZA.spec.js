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

  it('should search by zip code and sort the results', () => {
    MapPage.submitSearchApplySortingAndFiltersAZ(ZIP_CODE);
    browser.pause(2000);
  });

  it('should verify that items in search result are ordered from smallest to biggest', () => {
    let prevPrice = -Infinity;
    let resultSearchResultList = [];
    let index = 0;
    let currentSearchResultList = browser.$$('.th-left .th-price span');
    while (currentSearchResultList.length > 0) {
      let currentElement = currentSearchResultList[index];
      if (index === currentSearchResultList.length - 1) {
        currentElement.scrollIntoView();
        resultSearchResultList.push(...currentSearchResultList);
        let newSearchResultList = browser.$$('.th-left .th-price span');
        newSearchResultList = newSearchResultList.filter(
          el1=> !resultSearchResultList.some(el2=>el2.isEqual(el1)));
        currentSearchResultList = newSearchResultList;
        index = -1;
      }
      let currentPrice = +(currentElement.getText().replace(/[$,]/g, ''));
      expect(currentPrice).at.least(prevPrice);
      prevPrice = +(currentElement.getText().replace(/[$,]/g, ''));
      index++;
    }
  });
});
