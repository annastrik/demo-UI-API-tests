import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import SearchSortFilter from '../api/SearchSortFilterAPI';
import {itParam} from 'mocha-param';
import { searchUrlApi, paramsZipSearch } from '../fixtures/assert.js';

let uniqueAddressesListOnClient ={};
let uniqueAddressesListOnServer = {};

describe('SEARCH BY ZIP CODE TEST', () => {
  before('should open map through `Try for free` option from home page', () => {
    HomePage.open();
    HomePage.openMapAsTryForFree();
  });

  itParam('should verify that returned results on client are in searched zip code area', paramsZipSearch, (value) => {
    MapPage.submitSearch(value.ZIP_CODE);
    MapPage.applyPropertyStatusFilter(MapPage.propertyStatusFilterMenu, MapPage.activePropertyFilter);
    const zipAndUniqueAddress = MapPage.getZipAndUniqueAddressLists;
    const zipCodesListOnClient = zipAndUniqueAddress[0];
    expect(zipCodesListOnClient.length).above(0);
    expect(zipCodesListOnClient.length).eq(zipCodesListOnClient.filter(el=>el===value.ZIP_CODE).length);
    uniqueAddressesListOnClient[value.ZIP_CODE] = zipAndUniqueAddress[1];
  });

  itParam('should verify that returned results from server are in searched zip code area', paramsZipSearch, async(value) => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(searchUrlApi, value.BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const zipCodesListOnServer = SearchSortFilter.getZipFromSearchResultOnServer(searchItemListOnServer);
    expect(zipCodesListOnServer.length).above(0);
    expect(zipCodesListOnServer.length).eq(zipCodesListOnServer.filter(el=>el===value.ZIP_CODE).length);
    uniqueAddressesListOnServer[value.ZIP_CODE] = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', () => {
    expect(uniqueAddressesListOnServer).deep.equal(uniqueAddressesListOnClient);
  });
});
