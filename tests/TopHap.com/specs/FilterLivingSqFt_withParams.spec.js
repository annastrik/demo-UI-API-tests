import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import SearchSortFilter from '../api/SearchSortFilterAPI';
import {itParam} from 'mocha-param';
import { searchUrlApi, paramsFilterSqFt } from '../fixtures/assert.js';

let uniqueAddressesListOnClient = {};
let uniqueAddressesListOnServer = {};

describe('LIVING AREA SQUARE FEET TEST', () => {
  before('should open map through `Try for free` option from home page', () => {
    HomePage.open();
    HomePage.openMapAsTryForFree();
  });

  itParam('should verify that returned results on client have submitted living area sq ft', paramsFilterSqFt, (value) => {
    MapPage.submitSearch(value.ZIP_CODE);
    MapPage.applyLivingAreaFilter(MapPage.livingAreaFilterMenu, value.AREA_FROM, value.AREA_TO);
    const livingSqFtAndUniqueAddress = MapPage.getLivingSqFtAndUniqueAddressLists;
    const livingSqFtListOnClient = livingSqFtAndUniqueAddress[0];
    expect(livingSqFtListOnClient.length).above(0);
    expect(livingSqFtListOnClient.length).eq(livingSqFtListOnClient.filter(
      el =>  value.AREA_FROM === 'Any'? el <= value.AREA_TO : value.AREA_TO === 'Any'? el >= value.AREA_FROM :
        el >= value.AREA_FROM && el <= value.AREA_TO).length);
    uniqueAddressesListOnClient[`${value.AREA_FROM}-${value.AREA_TO}`] = livingSqFtAndUniqueAddress[1];
  });

  itParam('should verify that returned results from server have submitted living area sq ft', paramsFilterSqFt, async(value) => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(searchUrlApi, value.BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const livingSqFtListOnServer = SearchSortFilter.getLivingSqFtFromSearchResultOnServer(searchItemListOnServer);
    expect(livingSqFtListOnServer.length).above(0);
    expect(livingSqFtListOnServer.length).eq(livingSqFtListOnServer.filter(
      el => el>=value.AREA_FROM && el<=value.AREA_TO).length);
    uniqueAddressesListOnServer[`${value.AREA_FROM}-${value.AREA_TO}`]
        = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', () => {
    // another option to compare lists, if result lists returned from server are in different order and
    // expect().deep.equal() does not work:
    expect(Object.keys(uniqueAddressesListOnServer)).deep.equal(Object.keys(uniqueAddressesListOnClient));
    for (let el of Object.keys(uniqueAddressesListOnServer)) {
      expect(uniqueAddressesListOnServer[el]).to.include.members(uniqueAddressesListOnClient[el]);
      expect(uniqueAddressesListOnClient[el]).to.include.members(uniqueAddressesListOnServer[el]);
    }
  });
});
