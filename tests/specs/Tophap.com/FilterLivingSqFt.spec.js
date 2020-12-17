import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import SearchSortFilter from '../../_api/TopHap.com/SearchSortFilterAPI';

describe('LIVING AREA SQUARE FEET TEST', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  const ZIP_CODE = '94518';
  const AREA_FROM = '2000';
  const AREA_TO = '3000';
  const SEARCH_URL = 'https://api-v2.tophap.com/properties/search';
  const BODY = {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.08915316773609,37.902910553748114],[-121.95586783226439,38.00316203448003]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{'min':2000,'max':3000},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true};
  let uniqueAddressesListOnClient;
  let uniqueAddressesListOnServer = [];

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should search by zip code and apply filter', () => {
    MapPage.submitSearch(ZIP_CODE);
    MapPage.applyLivingAreaFilter(MapPage.livingAreaFilterMenu, AREA_FROM,AREA_TO);
  });

  it('should verify that returned results on client have submitted living area sq ft', () => {
    const livingSqFtAndUniqueAddress = MapPage.getLivingSqFtAndUniqueAddressLists;
    const livingSqFtListOnClient = livingSqFtAndUniqueAddress[0];
    expect(livingSqFtListOnClient.length).above(0);
    expect(livingSqFtListOnClient.length).eq(livingSqFtListOnClient.filter(el=>el>=AREA_FROM&&el<=AREA_TO).length);
    uniqueAddressesListOnClient = livingSqFtAndUniqueAddress[1];
  });

  it('should verify that returned results from server have submitted living area sq ft', async() => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const livingSqFtListOnServer = SearchSortFilter.getLivingSqFtFromSearchResultOnServer(searchItemListOnServer);
    expect(livingSqFtListOnServer.length).above(0);
    expect(livingSqFtListOnServer.length).eq(livingSqFtListOnServer.filter(el=>el>=AREA_FROM&&el<=AREA_TO).length);
    uniqueAddressesListOnServer = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', () => {
    expect(uniqueAddressesListOnServer).deep.equal(uniqueAddressesListOnClient);
  });
});
