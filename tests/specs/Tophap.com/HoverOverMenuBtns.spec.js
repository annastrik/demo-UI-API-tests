import {expect} from 'chai';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import { bottomMenuBtns } from '../../_data/TopHap.com/resources.data';

describe('HOVER OVER ANALYTIC MENU BUTTONS', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  it('should open map through `Try for free` option', () => {
    HomePage.openMapAsTryForFree();
  });

  it('all analytic menu`s buttons should have the correct pop-up sub-menus', () => {
    for (let i = 0; i < MapPage.bottomMenuBtnsCount; i++) {
      MapPage.moveToMenuBtn(bottomMenuBtns[i]);
      for (let j = 0; j < MapPage.hoverOverItemsPerBtnCount(i); j++){
        expect(MapPage.hoverOverItem(i,j).isClickable()).true;
      }
    }
  });
});
