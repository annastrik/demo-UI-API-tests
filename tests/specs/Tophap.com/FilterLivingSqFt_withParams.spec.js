import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import SearchSortFilter from '../../_api/TopHap.com/SearchSortFilterAPI';
import {itParam} from 'mocha-param';

const ZIP_CODE = '94518';
const SEARCH_URL = 'https://api-v2.tophap.com/properties/search';
const parameters = [
  {AREA_FROM: '2000',
    AREA_TO: '3000',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.08915316773609,37.902910553748114],[-121.95586783226439,38.00316203448003]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{'min':2000,'max':3000},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  },
  {AREA_FROM: '3000',
    AREA_TO: '4000',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.05764514746112,37.929133916496255],[-121.9873758525384,37.97696508957151]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{'min':3000,'max':4000},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  }
];
let uniqueAddressesListOnClient = {};
let uniqueAddressesListOnServer = {};

describe('LIVING AREA SQUARE FEET TEST', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  itParam('should verify that returned results on client have submitted living area sq ft', parameters, (value) => {
    MapPage.submitSearch(ZIP_CODE);
    MapPage.applyLivingAreaFilter(MapPage.livingAreaFilterMenu, value.AREA_FROM, value.AREA_TO);
    const livingSqFtAndUniqueAddress = MapPage.getLivingSqFtAndUniqueAddressLists;
    const livingSqFtListOnClient = livingSqFtAndUniqueAddress[0];
    expect(livingSqFtListOnClient.length).above(0);
    expect(livingSqFtListOnClient.length).eq(livingSqFtListOnClient.filter(
      el=>el>=value.AREA_FROM&&el<=value.AREA_TO).length);
    uniqueAddressesListOnClient[`${value.AREA_FROM}-${value.AREA_TO}`] = livingSqFtAndUniqueAddress[1];
  });

  itParam('should verify that returned results from server have submitted living area sq ft', parameters, async(value) => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, value.BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const livingSqFtListOnServer = SearchSortFilter.getLivingSqFtFromSearchResultOnServer(searchItemListOnServer);
    expect(livingSqFtListOnServer.length).above(0);
    expect(livingSqFtListOnServer.length).eq(livingSqFtListOnServer.filter(
      el=>el>=value.AREA_FROM&&el<=value.AREA_TO).length);
    uniqueAddressesListOnServer[`${value.AREA_FROM}-${value.AREA_TO}`]
        = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', () => {
    // another option to compare lists, if result lists returned from server are ordered differently and
    // expect().deep.equal() does not work:
    expect(Object.keys(uniqueAddressesListOnServer)).deep.equal(Object.keys(uniqueAddressesListOnClient));
    for (let el of Object.keys(uniqueAddressesListOnServer)) {
      expect(uniqueAddressesListOnServer[el]).to.include.members(uniqueAddressesListOnClient[el]);
      expect(uniqueAddressesListOnClient[el]).to.include.members(uniqueAddressesListOnServer[el]);
    }
  });
});
