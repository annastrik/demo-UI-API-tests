const bottomMenuBtnsWithHoverOversTxt = {
  Value: ['TopHap Estimate', 'TopHap Estimate $/ft² ', 'Value Appreciation',
    'TopHap Rental Estimate', 'Rental $/ft² Estimate', 'TopHap Estimate Accuracy',
    'Rental Estimate Accuracy'],
  Property: ['Living Area', 'Bedroom Count', 'Bathroom Count', 'Lot Size', 'Lot Slope',
    'Lot Usable Space', 'Garage', 'Has Pool', 'Stories', 'Age', 'Property Type', 'HOA fee'],
  Region: ['Walkability', 'Noise', 'Travel Time to Work', 'Daytime Population',
    'Seasonal Population ', 'Elevation', 'Rainfall', 'Temperature', 'Crime Index',
    'Land Use', 'Unique Zones', 'Property Density'],
  Hazards: ['Earthquake Risk', 'Weather Risk', 'Wind Index', 'Ozone Index',
    'Air Pollution Index', 'Carbon Monoxide Index', 'NO2 Index', 'Lead Index',
    'Particulate Matter Index', 'Hail Index', 'Hurricane Index', 'Tornado Index'],
  Market: ['Sold vs List', 'DOM', 'Ownership Time', 'Owner-Occupied', 'Last Sale Price',
    'Last Sale $/ft²', 'Turnover'],
  Investment: ['Gross Rental Yield', 'Home Equity Change', 'Taxes', 'Permits Count', 'Permits Value'],
  Community: ['Population', 'Population Density','Female Population', 'Male Population', 'Median Age',
    'Never Married', 'Now Married', 'Divorced',  'Widowed', 'Separated', 'Occupations: Blue Collar',
    'Occupations: White Collar', 'Average Employee Salary', 'Median Employee Salary', 'Per Capita Income',
    '# Households', 'Average Family Size', 'Average Household Size', 'Household Income',
    'Disposable Household Income', 'Household Expenditures'],
  School: ['Reviewer Rating Avg', 'Test Score Rating', 'Educational Climate Index',
    'Number of Students', 'Students per Grade', 'Students per Teacher', 'Number of Teachers',
    'College Bound'],
};

const bottomMenuBtns = Object.keys(bottomMenuBtnsWithHoverOversTxt);

const searchUrlApi = 'https://api-v2.tophap.com/properties/search';

const paramsCitySearch = [
  {CITY_NAME: 'PLEASANT HILL',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.11451711336773,37.92320171223662],[-122.03962988663238,37.9841026396261]],'zones':['00040657764'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  },
  {CITY_NAME: 'AROMAS',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-121.66787454022992,36.8551380020718],[-121.61417145977035,36.89733205326445]],'zones':['00040602812'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  }
];

const paramsZipSearch = [
  {ZIP_CODE: '94089',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':30,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.04939650404748,37.386812893796375],[-121.9783984959522,37.44091596122257]],'zones':['000394089'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}}}
  },
  {ZIP_CODE: '94518',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.14976921890491,37.25911139303838],[-122.05148678109423,37.455549327980236]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  }
];

const paramsFilterSqFt = [
  {ZIP_CODE: '94518',
    AREA_FROM: '2000',
    AREA_TO: '3000',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.08915316773609,37.902910553748114],[-121.95586783226439,38.00316203448003]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{'min':2000,'max':3000},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  },
  {ZIP_CODE: '94518',
    AREA_FROM: '3000',
    AREA_TO: '4000',
    BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.05764514746112,37.929133916496255],[-121.9873758525384,37.97696508957151]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{'min':3000,'max':4000},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
  }
];

const paramsSort = {
  ZIP_CODE: '94518',
  BODY_AZ: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'list_price','dir':'asc'}],'filters':{'bounds':[[-122.07221518829381,37.9173290888602],[-121.97280581170685,37.98876033841643]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true},
  BODY_ZA: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'list_price','dir':'desc'}],'filters':{'bounds':[[-122.0622496881546,37.92913391649532],[-121.98277131184611,37.97696508957057]],'zones':['000394518'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':['Active'],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{},'description':''}},'ultralight':true}
};

const paramsFilterYear = {
  ZIP_CODE: '94024',
  // if you do not want to limit 'from' or 'to' year built set 'Any' in the corresponding field
  YEAR_FROM: '2000',
  YEAR_TO: '2015',
  BODY: {'userId':'06w68ORSVjhStJgolHjNFk6zenB2','size':499,'sort':[{'option':'status_timestamp','dir':'desc'}],'filters':{'bounds':[[-122.2245679644315,37.28936782355254],[-121.97668803556925,37.425359828110516]],'zones':['000394024'],'metricsFilter':{'bathrooms':{},'bedrooms':{},'garage':{},'living_area':{},'lot_size_acres':{},'ownership_days':{},'period':{},'price':{},'price_per_sqft':{},'property_type':{'values':[]},'rental':false,'status':{'values':[],'close_date':{'min':'now-3M/d'}},'stories':{},'year_built':{'min':2000,'max':2015},'description':''}},'ultralight':true},
};

export { bottomMenuBtnsWithHoverOversTxt,bottomMenuBtns, searchUrlApi, paramsCitySearch, paramsZipSearch, paramsSort, paramsFilterYear, paramsFilterSqFt };
