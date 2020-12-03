const bottomMenuBtnsWithHoverOvers = {
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

const bottomMenuBtns = Object.keys(bottomMenuBtnsWithHoverOvers);

const bottomMenuBtnsCount = bottomMenuBtns.length;

export { bottomMenuBtnsWithHoverOvers,bottomMenuBtns, bottomMenuBtnsCount };
