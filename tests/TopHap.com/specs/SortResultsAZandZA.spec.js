import {expect} from 'chai';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import axios from 'axios';
import SearchSortFilter from '../api/SearchSortFilterAPI';
import { searchUrlApi, paramsSort } from '../fixtures/assert.js';

let uniqueAddressesListOnClientAZ;
let uniqueAddressesListOnClientZA;

describe('SORT A-Z AND Z-A PRICE TEST', () => {
  before('should open map through `Try for free` option from home page', () => {
    HomePage.open();
    HomePage.openMapAsTryForFree();
  });

  it('should search by zip code and sort the results from smallest to biggest', () => {
    MapPage.submitSearchApplySortingAndFiltersAZ(paramsSort.ZIP_CODE);
  });

  it('should verify that returned results on client are ordered from smallest to biggest', () => {
    let prevPrice = 0;
    const priceAndUniqueAddress = MapPage.getPriceAndUniqueAddressLists;
    const pricesListOnClient = priceAndUniqueAddress[0];
    expect(pricesListOnClient.length).above(0);
    pricesListOnClient.forEach(currentPrice=>{expect(currentPrice).at.least(prevPrice);
      prevPrice = currentPrice;
    });
    uniqueAddressesListOnClientAZ = priceAndUniqueAddress[1];
  });

  it('should check if returned results with A to Z sorting from client and server match', async() => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(searchUrlApi, paramsSort.BODY_AZ))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const uniqueAddressesListOnServerAZ = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
    expect(uniqueAddressesListOnServerAZ).deep.equal(uniqueAddressesListOnClientAZ);
  });

  it('should search by zip code and sort the results from biggest to smallest', () => {
    MapPage.submitSearchApplySortingAndFiltersZA(paramsSort.ZIP_CODE);
  });

  it('should verify that returned results on client are ordered from biggest to smallest', () => {
    let prevPrice = Infinity;
    const priceAndUniqueAddress = MapPage.getPriceAndUniqueAddressLists;
    const pricesListOnClient = priceAndUniqueAddress[0];
    expect(pricesListOnClient.length).above(0);
    pricesListOnClient.forEach(currentPrice=>{expect(currentPrice).at.most(prevPrice);
      prevPrice = currentPrice;
    });
    uniqueAddressesListOnClientZA = priceAndUniqueAddress[1];
  });

  it('should check if returned results with Z to A sorting from client and server match', async() => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(searchUrlApi, paramsSort.BODY_ZA))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const uniqueAddressesListOnServerZA = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
    expect(uniqueAddressesListOnServerZA).deep.equal(uniqueAddressesListOnClientZA);
  });
});
