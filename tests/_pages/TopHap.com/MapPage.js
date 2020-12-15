import BasePage from './BasePage';
import { bottomMenuBtnsWithHoverOversTxt, bottomMenuBtns, } from '../../_data/TopHap.com/mapPage.data';

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

  get moreFiltersBtn(){
    return browser.$('//div[text()="More"]');
  }

  get propertyStatusFilterMenu(){
    return browser.$('//div[text()="Property Status"]');
  }

  get yearBuiltFilterMenu(){
    return browser.$('//div[text()="Year Built"]');
  }

  get builtYearFilter(){
    return browser.$$('.th-year-built-option .th-select-input');
  }

  get statusFilterDropDownMenu(){
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

  openFilterMenu(filterType){
    if (!filterType.isDisplayed()){
      super.clickElement(this.moreFiltersBtn);
    }
    super.clickElement(filterType);
  }

  applyPropertyStatusFilter(filterType, filterOption){
    this.openFilterMenu(filterType);
    this.statusFilterDropDownMenu.waitForDisplayed();
    super.clickElement(filterOption);
  }

  setYearInFilter(index,yearFrom){
    // clearValue does not work in this case, bug either in Webdriver IO or Chromedriver
    // doubleClick(), keys('Delete') - workaround
    this.builtYearFilter[index].doubleClick();
    browser.pause(800);
    browser.keys('Delete');
    this.builtYearFilter[index].setValue(yearFrom);
    this.builtYearFilter[index].click({y: 50 });
  }

  applyYearBuiltFilter(filterType, yearFrom, yearTo){
    this.openFilterMenu(filterType);
    this.setYearInFilter(0, yearFrom);
    browser.pause(800);
    if ([...arguments].length === 3 ){
      this.setYearInFilter(1, yearTo);
      browser.pause(800);
    }
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
    this.applyPropertyStatusFilter(this.propertyStatusFilterMenu, this.activePropertyFilter);
    browser.pause(1500);
  }

  submitSearchApplyFilters(zipCode){
    this.clearOldSearchAndFilterRecords();
    this.submitSearch(zipCode);
    this.applyPropertyStatusFilter(this.propertyStatusFilterMenu, this.activePropertyFilter);
    browser.pause(1500);
  }

  submitSearchApplySortingAndFiltersAZ(zipCode){
    this.submitSearchApplySortingAndFilters(this.sortAZBtn, zipCode);
  }

  submitSearchApplySortingAndFiltersZA(zipCode){
    this.submitSearchApplySortingAndFilters(this.sortZABtn, zipCode);
  }

  getResultsList(locator) {
    let resultSearchResultList = [];
    let fullSearchElementsList = [];
    let uniqueAddressesList = [];
    let currentSearchResultList = this.searchItems;
    let index = currentSearchResultList.length - 1;
    while (currentSearchResultList.length > 0) {
      resultSearchResultList.push(...currentSearchResultList);
      fullSearchElementsList.push(...currentSearchResultList.map(el=>
          el.$(locator).getText()));
      uniqueAddressesList.push(...currentSearchResultList.map(el=>
          el.$('.th-address').getText()));
      let currentElement = currentSearchResultList[index];
      currentElement.scrollIntoView();
      browser.pause(1000);
      let newSearchResultList = this.searchItems;
      newSearchResultList = newSearchResultList.filter(el=>
          !uniqueAddressesList.includes(
              el.$('.th-address').getText()));
      currentSearchResultList = newSearchResultList;
      index = currentSearchResultList.length - 1;
    }
    return fullSearchElementsList;
  }

  get getPriceFromSearchResultOnClient(){
    return this.getResultsList('.th-left .th-price span').map(el=>+el.replace(/[$,]/g, ''));
  }

  get getZipFromSearchResultOnClient(){
    return this.getResultsList('.th-region').map(el=>el.split(', ')[1].split(' ')[1]);
  }

  get getAddressFromSearchResultOnClient(){
    return this.getResultsList('.th-address').map(el=>el.replace('Apt', '').replace('Unit', '').replace('Trlr', '').toUpperCase());
  }

  get getYearBuiltFromSearchResultOnClient(){
    return this.getResultsList('div:nth-of-type(6) > .th-property-info-value').map(el=>+el);
  }

}
export default new MapPage();
