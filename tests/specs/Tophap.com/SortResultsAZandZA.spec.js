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
    browser.pause(4000);
  });

  it('should search by zip code and sort the results', () => {
    let prevPrice = -Infinity;
    let resultSearchResultList = [];
    let index = 0;
    let currentSearchResultList = browser.$$('.th-left .th-price span');
    browser.pause(2000);
    while (currentSearchResultList.length > 0) {
      let currentElement = currentSearchResultList[index];
      if (index === currentSearchResultList.length - 1) {
        currentElement.scrollIntoView();
        browser.pause(3000);
        resultSearchResultList.push(...currentSearchResultList);
        let newSearchResultList = browser.$$('.th-left .th-price span');
        let newSearchResultListRemoved = [];
        for (let el of newSearchResultList){
          let temp = false;
          for (let el2 of resultSearchResultList){
            if (el.isEqual(el2)){
              temp = true; break;
            }
          }
          if (temp===false){
            newSearchResultListRemoved.push(el);
          }
        }
        currentSearchResultList = newSearchResultListRemoved;
        index = -1;
      }
      expect(+(currentElement.getText().replace(/[$,]/g, ''))).to.be.at.least(prevPrice);
      prevPrice = +(currentElement.getText().replace(/[$,]/g, ''));
      index++;
    }
  });
});
