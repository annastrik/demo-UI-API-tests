import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import SearchSortFilter from '../../_api/TopHap.com/SearchSortFilterAPI';

describe('SEARCH BY ZIP CODE Test', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  const ZIP_CODE = '94024';
  const SEARCH_URL = 'https://api-v2.tophap.com/properties/search';
  const BODY = {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.13408830874113,37.32627339585257],[-122.06716769126,37.38850295752687]],'zones':['000394024'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true};
  let uniqueAddressesListOnClient;
  let uniqueAddressesListOnServer = [];

  it('should open map through `Try for free` option', () => {
    HomePage.tryForFreeStart();
  });

  it('should search by zip code and apply filter', () => {
    MapPage.submitSearchApplyFilters(ZIP_CODE);
  });

  it('should verify that returned results on client are in searched zip code area', () => {
    uniqueAddressesListOnClient = MapPage.getAddressFromSearchResultOnClient;
    let zipCodesListOnClient = MapPage.getZipFromSearchResultOnClient;
    expect(zipCodesListOnClient.length).above(0);
    expect(zipCodesListOnClient.length).eq(zipCodesListOnClient.filter(el=>el===ZIP_CODE).length);
  });

  it('should verify that returned results from server are in searched zip code area', async() => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, BODY))
      .then(res => res)
      .catch(err => {console.log('ERROR', err);});
    response.data.items.forEach(el=>searchItemListOnServer.push(el));
    const zipCodesListOnServer = SearchSortFilter.getZipFromSearchResultOnServer(searchItemListOnServer);
    expect(zipCodesListOnServer.length).above(0);
    expect(zipCodesListOnServer.length).eq(zipCodesListOnServer.filter(el=>el===ZIP_CODE).length);
    uniqueAddressesListOnServer = SearchSortFilter.getAddressFromSearchResultOnServer(searchItemListOnServer);
  });

  it('should check if returned results from client and server match', async() => {
    expect(uniqueAddressesListOnServer).deep.equal(uniqueAddressesListOnClient);
  });
});
