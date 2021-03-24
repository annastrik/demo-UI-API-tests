import { Then } from 'cucumber';
import {expect} from 'chai';
import MapPage from '../pages/MapPage';
import { bottomMenuBtns } from '../fixtures/assert';

Then(/^All analytic menu's buttons should have the correct pop-up sub-menus$/, ()=> {
  for (let i = 0; i < MapPage.bottomMenuBtnsCount; i++) {
    MapPage.moveToMenuBtn(bottomMenuBtns[i]);
    for (let j = 0; j < MapPage.hoverOverItemsPerBtnCount(i); j++){
      expect(MapPage.hoverOverItem(i,j).isClickable()).true;
    }
  }
});
