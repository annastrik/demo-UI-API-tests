import {Given, When, Then} from 'cucumber';
import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import SearchSortFilter from '../api/SearchSortFilterAPI';

let soughtItemListOnServer;
let uniqueAddressesListOnClient = {};
let uniqueAddressesListOnServer = {};

Given(/^I'm on tophap.com website$/, function() {HomePage.open();});

When(/^I go to Map page$/, function() {HomePage.openMapAsTryForFree();});

When(/^I search with "([^"]*)?"$/, (param) => {
  MapPage.submitSearch(param);
});

When(/^I search with "([^"]*)?" and sort from "([^"]*)?"$/, (param, sortOrder) => {
  if (sortOrder === 'A->Z') {
    MapPage.submitSearchApplySortingAndFilters(MapPage.sortAZBtn, param);
  } else {
    MapPage.submitSearchApplySortingAndFilters(MapPage.sortZABtn, param);
  }
});

When(/^I apply Property status filter$/, () => {
  MapPage.applyPropertyStatusFilter(MapPage.propertyStatusFilterMenu, MapPage.activePropertyFilter);
});

When(/^I apply "([^"]*)?" - "([^"]*)?" filter of "([^"]*)?" filter type$/, (from, to, filterType) => {
  if (filterType === 'year built'){
    MapPage.applyYearBuiltFilter(MapPage.yearBuiltFilterMenu, from, to);
  } else if (filterType === 'living area'){
    MapPage.applyLivingAreaFilter(MapPage.livingAreaFilterMenu, from, to);
  }
});

Then(/^Returned results should be in "([^"]*)?" area with "([^"]*)?"$/, (param, searchType) => {
  let soughtParamAndUniqueAddress;
  if (searchType === 'zip') {
    soughtParamAndUniqueAddress = MapPage.getZipAndUniqueAddressLists;
  } else if (searchType === 'city') {
    soughtParamAndUniqueAddress = MapPage.getCityAndUniqueAddressLists;
  }
  const soughtParamListOnClient = soughtParamAndUniqueAddress[0];
  expect(soughtParamListOnClient.length).above(0);
  expect(soughtParamListOnClient.length).eq(soughtParamListOnClient.filter(el=>el===param).length);
  uniqueAddressesListOnClient[param] = soughtParamAndUniqueAddress[1];
});

Then(/^Returned results should be in "([^"]*)?" - "([^"]*)?" interval with "([^"]*)?" filter$/,
  (from, to, filter_type) => {
    let soughtParamAndUniqueAddress;
    if (filter_type === 'year built'){
      soughtParamAndUniqueAddress = MapPage.getYearBuiltAndUniqueAddressLists;
    } else if (filter_type === 'living area'){
      soughtParamAndUniqueAddress = MapPage.getLivingSqFtAndUniqueAddressLists;
    }
    const soughtParamListOnClient = soughtParamAndUniqueAddress[0];
    expect(soughtParamListOnClient.length).above(0);
    expect(soughtParamListOnClient.length).eq(soughtParamListOnClient.filter(
      el =>  from === 'Any'? el <= to : to === 'Any'? el >= from :
        el >= from && el <= to).length);
    uniqueAddressesListOnClient[`${from}-${to}`] = soughtParamAndUniqueAddress[1];
  });

When(/^I send http request with sought param in (.+) to "([^"]*)?"$/, async(body, path)=>{
  soughtItemListOnServer = [];
  const response = await axios(SearchSortFilter.createHttpPost(path, body))
    .then(res => res)
    .catch(err => {console.log('ERROR', err);});
  response.data.items.forEach(el=>soughtItemListOnServer.push(el));
});

Then(/^Returned results from server should be in "([^"]*)?" area with "([^"]*)?"$/, (param, search_type) => {
  let soughtParamListOnServer;
  if (search_type === 'zip') {
    soughtParamListOnServer = SearchSortFilter.getZipFromSearchResultOnServer(soughtItemListOnServer);
  } else if (search_type === 'city') {
    soughtParamListOnServer = SearchSortFilter.getCityFromSearchResultOnServer(soughtItemListOnServer);
  }
  expect(soughtParamListOnServer.length).above(0);
  expect(soughtParamListOnServer.length).eq(soughtParamListOnServer.filter(el=>el===param).length);
  uniqueAddressesListOnServer[param] = SearchSortFilter.getAddressFromSearchResultOnServer(soughtItemListOnServer);
});

Then(/^Returned results from server should be in "([^"]*)?" - "([^"]*)?" interval with "([^"]*)?" filter$/,
  (FROM, TO, FILTER_TYPE) => {
    let soughtParamListOnServer;
    if (FILTER_TYPE === 'year built'){
      soughtParamListOnServer = SearchSortFilter.getYearBuiltFromSearchResultOnServer(soughtItemListOnServer);
    } else if (FILTER_TYPE === 'living area'){
      soughtParamListOnServer = SearchSortFilter.getLivingSqFtFromSearchResultOnServer(soughtItemListOnServer);
    }
    expect(soughtParamListOnServer.length).above(0);
    expect(soughtParamListOnServer.length).eq(soughtParamListOnServer.filter(el=>el>=FROM&&el<=TO).length);
    uniqueAddressesListOnServer[`${FROM}-${TO}`] =
            SearchSortFilter.getAddressFromSearchResultOnServer(soughtItemListOnServer);
  });

Given(/^Returned results from client and server should match$/, () => {
  // another option to compare lists, if result lists returned from server are in different order and
  // expect().deep.equal() does not work:
  expect(Object.keys(uniqueAddressesListOnServer)).deep.equal(Object.keys(uniqueAddressesListOnClient));
  expect(Object.keys(uniqueAddressesListOnServer)).deep.equal(Object.keys(uniqueAddressesListOnClient));
  for (let el of Object.keys(uniqueAddressesListOnServer)) {
    expect(uniqueAddressesListOnServer[el]).to.include.members(uniqueAddressesListOnClient[el]);
    expect(uniqueAddressesListOnClient[el]).to.include.members(uniqueAddressesListOnServer[el]);
  }
});

Then(/^Returned results should be ordered from "([^"]*)?"$/, (sortOrder) => {
  let prevPrice;
  const priceAndUniqueAddress = MapPage.getPriceAndUniqueAddressLists;
  const pricesListOnClient = priceAndUniqueAddress[0];
  expect(pricesListOnClient.length).above(0);
  if (sortOrder === 'A->Z') {
    prevPrice = 0;
    pricesListOnClient.forEach(currentPrice=> {
      expect(currentPrice).at.least(prevPrice);
      prevPrice = currentPrice;
    });
  } else {
    prevPrice = Infinity;
    pricesListOnClient.forEach(currentPrice=>{expect(currentPrice).at.most(prevPrice);
      prevPrice = currentPrice;});
  }
  uniqueAddressesListOnClient[sortOrder] = priceAndUniqueAddress[1];
});

Then(/^I get response from server with "([^"]*)?" sorting$/, (sortOrder) => {
  // we do not check sorting order of results coming from server, because sorting is not necessary to be
  // done at server side, can be done at client side
  // we will only check that the list sent from the server is the same as we see on client, regardless of order
  uniqueAddressesListOnServer[sortOrder] = SearchSortFilter.getAddressFromSearchResultOnServer(soughtItemListOnServer);
});
