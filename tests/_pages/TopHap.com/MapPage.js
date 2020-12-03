import BasePage from './BasePage';
import {bottomMenuBtns, bottomMenuBtnsWithHoverOversTxt} from "../../_data/TopHap.com/mapPage.data";

class MapPage extends BasePage {

  menuBtn(text) {
    return browser.$(`//div[text()="${text}"]`);
  }

  // bottomMenuBtnsCount() {
  //   return bottomMenuBtns.length;
  // }

  hoverOverItemsSelector(text) {
    return browser.$(`//button[text()="${text}"]`);
  }

  hoverOverTxt(index) {
    return bottomMenuBtnsWithHoverOversTxt[bottomMenuBtns[index]];
  }

  hoverOverItemsPerBtnCount(index){
    return this.hoverOverTxt(index).length;
  }

  hoverOverItem(index, index2){
    return this.hoverOverItemsSelector(this.hoverOverTxt(index)[index2]);
  }

  moveToMenuBtn(text) {
    super.moveToElement(this.menuBtn(text));
  }
}
export default new MapPage();
