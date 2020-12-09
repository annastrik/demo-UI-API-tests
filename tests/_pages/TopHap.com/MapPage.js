import BasePage from './BasePage';
import { bottomMenuBtnsWithHoverOversTxt, bottomMenuBtns} from '../../_data/TopHap.com/mapPage.data';

class MapPage extends BasePage {

  menuBtn(text) {
    return browser.$(`//div[text()="${text}"]`);
  }

  get bottomMenuBtnsCount(){
    return bottomMenuBtns.length;
  }

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

  get searchResultsMenu(){
    return browser.$('//aside[contains(@class,"th-sider")]');
  }

  get clearSearchFilterBtns(){
    return browser.$$('.th-clear-button');
  }

  get searchInputField(){
    return browser.$('#th-geo-input');
  }

  get searchBtn(){
    return browser.$('.th-search-button');
  }

  get propertyStatusFilterMenu(){
    return browser.$('//div[text()="Property Status"]');
  }

  get filterDropDownMenu(){
    return browser.$('.th-status-option');
  }

  get activePropertyFilter(){
    return browser.$('//label//span[text()="Active"]');
  }

  get sortMenu(){
    return browser.$('.th-trigger');
  }

  get sortAZBtn(){
    return browser.$('//button[text()="A-Z"]');
  }

  get sortZABtn(){
    return browser.$('//button[text()="Z-A"]');
  }

  get priceSorting(){
    return browser.$('//button[text()="Price"]');
  }

  get searchItems(){
    return browser.$$('.th-property-card');
  }

  moveToMenuBtn(text) {
    super.moveToElement(this.menuBtn(text));
  }

  submitSearch(searchCriteria){
    this.searchInputField.setValue(searchCriteria);
    browser.pause(2000);
    super.clickElement(this.searchBtn);
    this.searchResultsMenu.waitForDisplayed();
  }

  applyFilter(filterType, filterOption){
    super.clickElement(filterType);
    this.filterDropDownMenu.waitForDisplayed();
    super.clickElement(filterOption);
  }

  applySort(orderAtoZorZtoA, sortOption){
    super.clickElement(this.sortMenu);
    super.clickElement(orderAtoZorZtoA);
    super.clickElement(sortOption);
  }

  clearOldSearchAndFilterRecords() {
    if (this.clearSearchFilterBtns.length > 0) {
      for (let clearSearchFilterBtn of this.clearSearchFilterBtns) {
        super.clickElement(clearSearchFilterBtn);
      }
    }
  }

  submitSearchApplySortingAndFilters(orderAtoZorZtoA, zipCode){
    this.clearOldSearchAndFilterRecords();
    this.submitSearch(zipCode);
    this.applySort(orderAtoZorZtoA, this.priceSorting);
    this.applyFilter(this.propertyStatusFilterMenu, this.activePropertyFilter);
    browser.pause(1500);
  }

  submitSearchApplySortingAndFiltersAZ(zipCode){
    this.submitSearchApplySortingAndFilters(this.sortAZBtn, zipCode);
  }

  submitSearchApplySortingAndFiltersZA(zipCode){
    this.submitSearchApplySortingAndFilters(this.sortZABtn, zipCode);
  }

  getResultsList(element) {
    let resultSearchResultList = [];
    let fullSearchElementsList = [];
    let currentSearchResultList = this.searchItems;
    let index = currentSearchResultList.length - 1;
    while (currentSearchResultList.length > 0) {
      resultSearchResultList.push(...currentSearchResultList);
      fullSearchElementsList.push(...currentSearchResultList.map(el=>
        el.$(element).getText()));
      let currentElement = currentSearchResultList[index];
      currentElement.scrollIntoView();
      browser.pause(1000);
      let newSearchResultList = this.searchItems;
      newSearchResultList = newSearchResultList.filter(el=>
        !fullSearchElementsList.includes(
          el.$(element).getText()));
      currentSearchResultList = newSearchResultList;
      index = currentSearchResultList.length - 1;
    }
    return fullSearchElementsList;
  }

  get getPriceFromSearchItemResult(){
    return this.getResultsList('.th-left .th-price span').map(el=>+el.replace(/[$,]/g, ''));
  }

  get getAddressFromSearchItemResult(){
    return this.getResultsList('.th-address');
  }
}
export default new MapPage();
