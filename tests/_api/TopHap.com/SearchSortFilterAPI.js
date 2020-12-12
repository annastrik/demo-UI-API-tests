class SearchSortFilterAPI {

  createHttpGet(url){
    return {
      method: 'get',
      url: url,
    };
  }

  createHttpPost(url, postBody){
    return {
      method: 'post',
      url: url,
      data: postBody,
    };
  }

  getAddressFromSearchResultOnServer(list){
    return list.map(el=>el._source.address.UnparsedAddress.replace('UNIT', '#'));
  }

  getZipFromSearchResultOnServer(list){
    return list.map(el=>el._source.address.PostalCode);
  }
}
export default new SearchSortFilterAPI();
