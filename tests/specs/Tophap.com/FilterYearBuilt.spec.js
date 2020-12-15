import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import SearchSortFilter from '../../_api/TopHap.com/SearchSortFilterAPI';

describe('FILTER YEAR BUILT TEST', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  const ZIP_CODE = '94024';
  const YEAR_FROM = '2000';
  const YEAR_TO = '2015';
  const SEARCH_URL = 'https://api-v2.tophap.com/properties/search';
  const BODY = {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.2245679644315,37.28936782355254],[-121.97668803556925,37.425359828110516]],'zones':['000394024'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{'min':2000,'max':2015},'description':''}},'ultralight':true};
  let uniqueAddressesListOnClient;
  let uniqueAddressesListOnServer = [];

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should search by zip code and apply filter', () => {
    MapPage.submitSearch(ZIP_CODE);
    MapPage.applyYearBuiltFilter(MapPage.yearBuiltFilterMenu, YEAR_FROM,YEAR_TO);
  });

  it('should verify that returned results on client have submitted built year', () => {
    //uniqueAddressesListOnClient = MapPage.getAddressFromSearchResultOnClient;
    let yearBuiltListOnClient = MapPage.getYearBuiltFromSearchResultOnClient;
    console.log('1111111111111 '+yearBuiltListOnClient);
    console.log('222222222222222 '+yearBuiltListOnClient.length);
    expect(yearBuiltListOnClient.length).above(0);
    yearBuiltListOnClient.forEach(currentPrice=>{expect(currentPrice).within(+YEAR_FROM, +YEAR_TO);
    });
  });

  it('should verify that returned results from server have submitted built year', async() => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const builtYearListOnServer = SearchSortFilter.getBuiltYearFromSearchResultOnServer(searchItemListOnServer);
    console.log('bbbbbbbbbbbbbb '+builtYearListOnServer);
    expect(builtYearListOnServer.length).above(0);
    expect(builtYearListOnServer.length).eq(builtYearListOnServer.filter(el=>el>=YEAR_FROM&&el<=YEAR_TO).length);
    uniqueAddressesListOnServer = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });
  //
  // it('should check if returned results from client and server match', async() => {
  //   expect(uniqueAddressesListOnServer).deep.equal(uniqueAddressesListOnClient);
  // });
});
