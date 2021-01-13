import {expect} from 'chai';
import axios from 'axios';
import HomePage from '../../_pages/TopHap.com/HomePage';
import MapPage from '../../_pages/TopHap.com/MapPage';
import SearchSortFilter from '../../_api/TopHap.com/SearchSortFilterAPI';
import {itParam} from 'mocha-param';

const SEARCH_URL = 'https://api-v2.tophap.com/properties/search';
const parameters = [
  {CITY_NAME: 'PLEASANT HILL',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.11451711336773,37.92320171223662],[-122.03962988663238,37.9841026396261]],'zones':['00040657764'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  },
  {CITY_NAME: 'SAN MARTIN',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-121.63059640294759,37.047099343038965],[-121.54667859705128,37.12244421230004]],'zones':['00040668238'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  }
];
let uniqueAddressesListOnClient ={};
let uniqueAddressesListOnServer = {};

describe('SEARCH BY CITY TEST', () => {
  before('should open www.tophap.com', () => {
    HomePage.open();
  });

  it('should open map through `Try for free` option', () => {
    HomePage.openMapAsTryForFree();
  });

  itParam('should verify that returned results on client are in searched city area', parameters, (value) => {
    MapPage.submitSearch(value.CITY_NAME);
    MapPage.applyPropertyStatusFilter(MapPage.propertyStatusFilterMenu, MapPage.activePropertyFilter);
    const cityAndUniqueAddress = MapPage.getCityAndUniqueAddressLists;
    const cityCodesListOnClient = cityAndUniqueAddress[0];
    expect(cityCodesListOnClient.length).above(0);
    expect(cityCodesListOnClient.length).eq(cityCodesListOnClient.filter(el=>el===value.CITY_NAME).length);
    uniqueAddressesListOnClient[value.CITY_NAME] = cityAndUniqueAddress[1];
  });

  itParam('should verify that returned results from server are in searched city area', parameters, async(value) => {
    let searchItemListOnServer = [];
    const response = await axios(SearchSortFilter.createHttpPost(SEARCH_URL, value.BODY))
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
