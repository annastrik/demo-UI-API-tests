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

  get openYearsDropDownMenu(){
    return browser.$$('.th-year-built-option .MuiAutocomplete-endAdornment');
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
    if (!filterType.isDisplayed()){
      super.clickElement(this.moreFiltersBtn);
    }
    super.clickElement(filterType);
    //this.filterDropDownMenu.waitForDisplayed();
    super.clickElement(filterOption);
  }

  applyYearBuiltFilter(filterType, year){
    if (!filterType.isDisplayed()){
      super.clickElement(this.moreFiltersBtn);
    }
    super.clickElement(filterType);
    super.clickElement(this.openYearsDropDownMenu[0]);
    browser.pause(1000);
    let button1 = browser.$$('.th-year-built-option .th-select-input')[0];
    let button2 = browser.$$('.th-year-built-option .th-select-input')[1];
    let button3 = browser.$('//div[text()="Stories"]');
    let button4 = browser.$('//div[text()="Year Built"]');
    let coordx = button1.getLocation('x');
    let coordy = button1.getLocation('y');
    let coordx2 = button2.getLocation('x');
    let coordy2 = button2.getLocation('y');
    let coordx3 = button3.getLocation('x');
    let coordy3 = button3.getLocation('y');
    let coordx4 = button4.getLocation('x');
    let coordy4 = button4.getLocation('y');
    console.log('xxxxxxxxxxxxx '+coordx);
    console.log('yyyyyyyyyyyyyy '+coordy);
    console.log('xxxxx222222222 '+coordx2);
    console.log('yyyyy22222222222 '+coordy2);
    console.log('xxx33333333333 '+coordx3);
    console.log('yyy33333333333333 '+coordy3);
    console.log('44444444444 '+coordx4);
    console.log('444444444444 '+coordy4);
    browser.$('.th-year-built-option .th-select-input').moveTo(coordx3,coordy3);
    //browser.keys('\uE007');
    //super.moveToElementAndClick(browser.$('//input[contains(@*,"option-11")]'));
    //browser.$('.th-year-built-option .th-select-input').doubleClick();
    //browser.keys('Delete');
    //browser.pause(2000);
    //browser.$('.th-year-built-option .th-select-input').setValue('2015');
    browser.pause(2000);
    //browser.$('//input[@value="2015"]').moveTo(100,200);
    //browser.pause(2000);
    //browser.keys('\uE007');
    //browser.pause(2000);
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

  submitSearchApplyFilters(zipCode){
    this.clearOldSearchAndFilterRecords();
    this.submitSearch(zipCode);
    this.applyFilter(this.propertyStatusFilterMenu, this.activePropertyFilter);
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
}
export default new MapPage();
