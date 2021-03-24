import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import { bottomMenuBtns } from '../fixtures/assert';

describe('HOVER OVER ANALYTIC MENU BUTTONS', () => {
  before('should open map through `Try for free` option from home page', () => {
    HomePage.open();
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
