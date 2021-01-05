import {expect} from 'chai';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import axios from 'axios';
import SearchSortFilter from '../../_api/TopHap.com/SearchSortFilterAPI';

const ZIP_CODE = '94518';
const SEARCH_URL = 'https://api-v2.tophap.com/properties/search';
const BODY_AZ = {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'list_price','dir':'asc'}],'filters':{'bounds':[[-122.07221518829381,37.9173290888602],[-121.97280581170685,37.98876033841643]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true};
const BODY_ZA = {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'list_price','dir':'desc'}],'filters':{'bounds':[[-122.0622496881546,37.92913391649532],[-121.98277131184611,37.97696508957057]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true};
let uniqueAddressesListOnClientAZ;
let uniqueAddressesListOnClientZA;

describe('SORT A-Z AND Z-A PRICE TEST', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should search by zip code and sort the results from smallest to biggest', () => {
    MapPage.submitSearchApplySortingAndFiltersAZ(ZIP_CODE);
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
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, BODY_AZ))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const uniqueAddressesListOnServerAZ = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
    expect(uniqueAddressesListOnServerAZ).deep.equal(uniqueAddressesListOnClientAZ);
  });

  it('should search by zip code and sort the results from biggest to smallest', () => {
    MapPage.submitSearchApplySortingAndFiltersZA(ZIP_CODE);
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
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, BODY_ZA))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const uniqueAddressesListOnServerZA = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
    expect(uniqueAddressesListOnServerZA).deep.equal(uniqueAddressesListOnClientZA);
  });
});
