import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import SearchSortFilter from '../api/SearchSortFilterAPI';
import { searchUrlApi, paramsFilterYear } from '../fixtures/assert.js';

let uniqueAddressesListOnClient;
let uniqueAddressesListOnServer = [];

describe('FILTER YEAR BUILT TEST', () => {
  before('should open map through `Try for free` option from home page', () => {
    HomePage.open();
    HomePage.openMapAsTryForFree();
  });

  it('should search by zip code and apply "year built" filter', () => {
    MapPage.submitSearch(paramsFilterYear.ZIP_CODE);
    MapPage.applyYearBuiltFilter(MapPage.yearBuiltFilterMenu, paramsFilterYear.YEAR_FROM, paramsFilterYear. YEAR_TO);
  });

  it('should verify that returned results on client have submitted built year', () => {
    const yearBuiltAndUniqueAddress = MapPage.getYearBuiltAndUniqueAddressLists;
    const yearBuiltListOnClient = yearBuiltAndUniqueAddress[0];
    expect(yearBuiltListOnClient.length).above(0);
    expect(yearBuiltListOnClient.length).eq(yearBuiltListOnClient.filter(
      el =>  paramsFilterYear.YEAR_FROM === 'Any'? el <= paramsFilterYear.YEAR_TO :
        paramsFilterYear.YEAR_TO === 'Any'? el >= paramsFilterYear.YEAR_FROM :
          el >= paramsFilterYear.YEAR_FROM && el <= paramsFilterYear.YEAR_TO).length);
    uniqueAddressesListOnClient = yearBuiltAndUniqueAddress[1];
  });

  it('should verify that returned results from server have submitted built year', async() => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(searchUrlApi, paramsFilterYear.BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const yearBuiltListOnServer = SearchSortFilter.getYearBuiltFromSearchResultOnServer(searchItemListOnServer);
    expect(yearBuiltListOnServer.length).above(0);
    expect(yearBuiltListOnServer.length).eq(yearBuiltListOnServer.filter(
      el => el >= paramsFilterYear.YEAR_FROM && el <= paramsFilterYear. YEAR_TO).length);
    uniqueAddressesListOnServer = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', () => {
    expect(uniqueAddressesListOnServer).deep.equal(uniqueAddressesListOnClient);
  });
});
