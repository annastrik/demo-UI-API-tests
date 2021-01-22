Feature: Sorting search result

  Scenario Outline: Sorting properties in search result
    Given I'm on tophap.com website
    When I go to Map page
    And I search with "<zip code>" and sort from "<AtoZ or ZtoA>"
    Then Returned results should be ordered from "<AtoZ or ZtoA>"

    Examples:
      | zip code | AtoZ or ZtoA |
      | 94518    |      A->Z    |
      | 94518    |      Z->A    |

  Scenario Outline: Sorting properties in search result on server
    When I send http request with sought param in <body> to "<path>"
    Then I get response from server with "<AtoZ or ZtoA>" sorting

    Examples:
      | AtoZ or ZtoA | path                                          | body                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
      | A->Z         | https://api-v2.tophap.com/properties/search   | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":499,"sort":[{"option":"list_price","dir":"asc"}],"filters":{"bounds":[[-122.05464730721943,37.92877252005607],[-121.99037369278015,37.97732624899473]],"zones":["000394518"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":["Active"],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}},"ultralight":true} |
      | Z->A         | https://api-v2.tophap.com/properties/search   | {"userId":"06w68ORSVjhStJgolHjNFk6zenB2","size":30,"sort":[{"option":"list_price","dir":"desc"}],"filters":{"bounds":[[-122.10212648148114,37.85543160402251],[-121.94289451851829,38.05054562826854]],"zones":["000394518"],"metricsFilter":{"bathrooms":{},"bedrooms":{},"garage":{},"living_area":{},"lot_size_acres":{},"ownership_days":{},"period":{},"price":{},"price_per_sqft":{},"property_type":{"values":[]},"rental":false,"status":{"values":["Active"],"close_date":{"min":"now-3M/d"}},"stories":{},"year_built":{},"description":""}}}                   |

  Scenario: Matching search results on client and server
    Given Returned results from client and server should match
