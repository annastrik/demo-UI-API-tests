import {expect} from 'chai';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import { bottomMenuBtns } from '../../_data/TopHap.com/mapPage.data';

describe('HOVER OVER MENUS TEST', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should check all hover over items for all bottom menu buttons', () => {
    for (let i = 0; i < MapPage.bottomMenuBtnsCount; i++) {
      MapPage.moveToMenuBtn(bottomMenuBtns[i]);
      for (let j = 0; j < MapPage.hoverOverItemsPerBtnCount(i); j++){
        expect(MapPage.hoverOverItem(i,j).isClickable()).true;
      }
    }
  });
});
