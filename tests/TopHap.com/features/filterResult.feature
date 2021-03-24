Feature: Filtering search result

  Scenario Outline: Filtering properties by 'Year Built' filter
    Given I'm on tophap.com website
    When I go to Map page
    And I search with "<zip code>"
    And I apply "<year_from>" - "<year_to>" filter of "<year_built>" filter type
    Then Returned results should be in "<year_from>" - "<year_to>" interval with "<year_built>" filter

    Examples:
#    if you do not want to limit 'from' or 'to' year built set Any in the corresponding column
      | zip code | year_from | year_to | year_built |
      | 94024    | 2000      |  2015   | year built |

  Scenario Outline: Filtering properties by 'Year Built' filter on server
    When I send http request with sought param in <body> to "<path>"
    Then Returned results from server should be in "<year_from>" - "<year_to>" interval with "<year_built>" filter

    Examples:
      | year_from | year_to | year_built | path                                        | body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
      | 2000      | 2015    | year built | https://api-v2.tophap.com/properties/search | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":499,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-122.14480249416435,37.31542499864017],[-122.0564535058374,37.39934079805883]],"zones":["000394024"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":[],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{"min":2000,"max":2015},"description":""}},"ultralight":true} |

  Scenario Outline: Filtering properties by 'Living Area' filter
    Given I'm on tophap.com website
    When I go to Map page
    And I search with "<zip code>"
    And I apply "<area_from>" - "<area_to>" filter of "<living_area>" filter type
    Then Returned results should be in "<area_from>" - "<area_to>" interval with "<living_area>" filter

    Examples:
#    if you do not want to limit 'from' or 'to' living area set Any in the corresponding column
      | zip code | area_from | area_to | living_area |
      | 94518    | 2000      |  3000   | living area |
      | 94518    | 3000      |  4000   | living area |

  Scenario Outline: Filtering properties by 'Living Area' filter on server
    When I send http request with sought param in <body> to "<path>"
    Then Returned results from server should be in "<area_from>" - "<area_to>" interval with "<living_area>" filter

    Examples:
      | area_from | area_to | living_area | path                                        | body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
      | 2000      | 3000    | living area | https://api-v2.tophap.com/properties/search | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":499,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-122.0346250188827,37.929276086173914],[-122.0103959811167,37.97682301215612]],"zones":["000394518"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{"min":2000,"max":3000},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":[],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}},"ultralight":true} |
      | 3000      | 4000    | living area | https://api-v2.tophap.com/properties/search | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":499,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-122.0346250188827,37.929276086173914],[-122.0103959811167,37.97682301215612]],"zones":["000394518"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{"min":3000,"max":4000},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":[],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}},"ultralight":true} |

  Scenario: Matching search results on client and server
    Then Returned results from client and server should match
