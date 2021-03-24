import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import SearchSortFilter from '../api/SearchSortFilterAPI';
import {itParam} from 'mocha-param';
import { searchUrlApi, paramsCitySearch } from '../fixtures/assert.js';

let uniqueAddressesListOnClient ={};
let uniqueAddressesListOnServer = {};

describe('SEARCH BY CITY TEST', () => {
  before('should open map through `Try for free` option from home page', () => {
    HomePage.open();
    HomePage.openMapAsTryForFree();
  });

  itParam('should verify that returned results on client are in searched city area', paramsCitySearch, (value) => {
    MapPage.submitSearch(value.CITY_NAME);
    MapPage.applyPropertyStatusFilter(MapPage.propertyStatusFilterMenu, MapPage.activePropertyFilter);
    const cityAndUniqueAddress = MapPage.getCityAndUniqueAddressLists;
    const cityCodesListOnClient = cityAndUniqueAddress[0];
    expect(cityCodesListOnClient.length).above(0);
    expect(cityCodesListOnClient.length).eq(cityCodesListOnClient.filter(el=>el===value.CITY_NAME).length);
    uniqueAddressesListOnClient[value.CITY_NAME] = cityAndUniqueAddress[1];
  });

  itParam('should verify that returned results from server are in searched city area', paramsCitySearch, async(value) => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(searchUrlApi, value.BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const citiesListOnServer = SearchSortFilter.getCityFromSearchResultOnServer(searchItemListOnServer);
    expect(citiesListOnServer.length).above(0);
    expect(citiesListOnServer.length).eq(citiesListOnServer.filter(el=>el===value.CITY_NAME).length);
    uniqueAddressesListOnServer[value.CITY_NAME] = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', () => {
    expect(uniqueAddressesListOnServer).deep.equal(uniqueAddressesListOnClient);
  });
});
