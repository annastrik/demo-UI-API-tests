import BasePage from './BasePage';
import {bottomMenuBtns, bottomMenuBtnsWithHoverOvers} from "../../_data/TopHap.com/mapPage.data";
import {expect} from "chai";

class MapPage extends BasePage {

  menuBtn(text) {
    return browser.$(`//div[text()="${text}"]`);
  }

  hoverOverItems(text) {
    return browser.$(`//button[text()="${text}"]`);
  }

  hoverOvers(index) {
    return bottomMenuBtnsWithHoverOvers[bottomMenuBtns[index]];
  }

  hoverOverItem(index) {
    return this.hoverOverItems(this.hoverOvers(index));
  }

  moveToMenuBtn(text) {
    super.moveToElement(this.menuBtn(text));
  }
}
export default new MapPage();
