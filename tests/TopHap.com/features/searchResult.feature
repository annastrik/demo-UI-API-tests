Feature: Searching properties

  Scenario Outline: Searching properties by zip code
    Given I'm on tophap.com website
    When I go to Map page
    And I search with "<zip code>"
    And I apply Property status filter
    Then Returned results should be in "<zip code>" area with "<zip search>"

    Examples:
      | zip code | zip search |
      | 94089    | zip        |
      | 94518    | zip        |

  Scenario Outline: Search properties by zip code on server
    When I send http request with sought param in <body> to "<path>"
    Then Returned results from server should be in "<zip code>" area with "<zip search>"

    Examples:
      | zip code | zip search | path                                          | body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
      | 94089    | zip        |https://api-v2.tophap.com/properties/search    | {"userId":"Njcri3ySj6fuEscHPVOt3L625Fk2","size":30,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-122.04439697604772,37.37097794690645],[-121.98339802395186,37.456736131094914]],"zones":["000394089"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":["Active"],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}}}                     |
      | 94518    | zip        |https://api-v2.tophap.com/properties/search    | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":499,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-122.05844615887807,37.88698121045827],[-121.98657484112121,38.01906620706774]],"zones":["000394518"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":["Active"],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}},"ultralight":true}   |

  Scenario Outline: Searching properties by city
    Given I'm on tophap.com website
    When I go to Map page
    And I search with "<city>"
    And I apply Property status filter
    Then Returned results should be in "<city>" area with "<city search>"

    Examples:
      | city          | city search |
      | PLEASANT HILL | city        |
      | AROMAS        | city        |

  Scenario Outline: Searching properties by city on server
    When I send http request with sought param in <body> to "<path>"
    Then Returned results from server should be in "<city>" area with "<city search>"

    Examples:
      | city          | city search | path                                           | body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
      | PLEASANT HILL | city        | https://api-v2.tophap.com/properties/search    | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":499,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-122.1091453725609,37.923433355214826],[-122.04500162743886,37.98387118788348]],"zones":["00040657764"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":["Active"],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}},"ultralight":true} |
      | AROMAS        | city        | https://api-v2.tophap.com/properties/search    | {"userId":"Njcri3ySj6fuEscHPVOt3L625Fk2","size":30,"sort":[{"option":"status_timestamp","dir":"desc"}],"filters":{"bounds":[[-121.67032199150097,36.8554369087485],[-121.61172400849824,36.89703331050244]],"zones":["00040602812"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":["Active"],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}}}                     |

  Scenario: Matching search results on client and server
    Then Returned results from client and server should match
