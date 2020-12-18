import BasePage from './BasePage';
import { bottomMenuBtnsWithHoverOversTxt, bottomMenuBtns, } from '../../_data/TopHap.com/resources.data';
import { movingIsFinished } from '../../_data/TopHap.com/resources.data';

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

  get livingAreaFilterMenu(){
    return browser.$('//div[text()="Living Area"]');
  }

  get builtYearFilter(){
    return browser.$$('.th-year-built-option .th-select-input');
  }

  get livingAreaFilter(){
    return browser.$$('.th-living-area-option .th-input');
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

  get propertiesCount(){
    return browser.$('.th-properties-count');
  }

  get searchItems(){
    return browser.$$('.th-property-card');
  }

  moveToMenuBtn(text) {
    super.moveToElement(this.menuBtn(text));
  }

  submitSearch(searchCriteria){
    this.clearOldSearchAndFilterRecords();
    this.searchInputField.setValue(searchCriteria);
    browser.pause(2000);
    super.clickElement(this.searchBtn);
    this.waitForResultList();
  }

  waitForResultList(){
    super.elementsAreLoaded(this.searchItems);
    browser.waitUntil( () => +this.propertiesCount.getText().split(' ')[0] !== 0);
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
    this.waitForResultList();
  }

  setYearInFilter(index,year){
    // clearValue does not work in this case, bug either in Webdriver IO or Chromedriver
    // doubleClick(), keys('Delete') - workaround
    this.builtYearFilter[index].doubleClick();
    browser.pause(800);
    browser.keys('Delete');
    this.builtYearFilter[index].setValue(year);
    this.builtYearFilter[index].click({y: 50 });
  }

  setLivingAreaSqFtInFilter(index,area){
    this.livingAreaFilter[index].setValue(area);
    browser.keys('\uE007');
  }

  applyYearBuiltFilter(filterType, yearFrom, yearTo){
    this.openFilterMenu(filterType);
    this.setYearInFilter(0, yearFrom);
    if ([...arguments].length === 3 ){
      this.setYearInFilter(1, yearTo);
    }
    this.waitForResultList();
  }

  applyLivingAreaFilter(filterType, areaFrom, areaTo){
    this.openFilterMenu(filterType);
    this.setLivingAreaSqFtInFilter(0, areaFrom);
    if ([...arguments].length === 3 ){
      this.setLivingAreaSqFtInFilter(1, areaTo);
    }
    this.waitForResultList();
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
      movingIsFinished(currentElement);
      //browser.pause(1000);
      let newSearchResultList = this.searchItems;
      newSearchResultList = newSearchResultList.filter(el=>
        !uniqueAddressesList.includes(
          el.$('.th-address').getText()));
      currentSearchResultList = newSearchResultList;
      index = currentSearchResultList.length - 1;
    }
    return [fullSearchElementsList, uniqueAddressesList];
  }

  normalizeAddressList(list){
    return list.map(el=>el.replace('Apt', '').replace('Unit', '').replace('Trlr', '').toUpperCase());
  }

  get getPriceAndUniqueAddressLists(){
    const result = this.getResultsList('.th-left .th-price span');
    return [result[0].map(el=>+el.replace(/[$,]/g, '')),
      this.normalizeAddressList(result[1])];
  }

  get getYearBuiltAndUniqueAddressLists(){
    const result = this.getResultsList('div:nth-of-type(6) > .th-property-info-value');
    return [result[0].map(el=>+el),
      this.normalizeAddressList(result[1])];
  }

  get getZipAndUniqueAddressLists(){
    const result = this.getResultsList('.th-region');
    return [result[0].map(el=>el.split(', ')[1].split(' ')[1]),
      this.normalizeAddressList(result[1])];
  }

  get getUniqueAddressList(){
    return this.normalizeAddressList(this.getResultsList('.th-address')[1]);
  }

  get getLivingSqFtAndUniqueAddressLists(){
    const result = this.getResultsList('div:nth-of-type(3) > .th-property-info-value');
    return [result[0].map(el=>+el.replace(/,/g, '')),
      this.normalizeAddressList(result[1])];
  }
}
export default new MapPage();
