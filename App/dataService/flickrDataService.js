var app = angular.module("flickrApp");

app.factory('flickrDataService', ['$http', '$q', function ($http, $q) {

    function getSearchData(searchField, perPage, currentPage) {
        var endPoint = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=df51505e6f9157e662db08847069da1b&tags=" + searchField + "%2C+&per_page=" + perPage + "&page=" + currentPage + "&format=json&nojsoncallback=1";
        var req = {
            method: 'GET',
            url: endPoint
        }

        var deferred = $q.defer();
        $http(req).success(function (data) {
            deferred.resolve(data);
        })
          .error(function (err) {
              console.log('Error retrieving data');
              deferred.reject(err);
          });
        return deferred.promise;
    }

    return {
        getSearchData: getSearchData
    };
}]);