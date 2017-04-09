(function() {
    'use strict';

    angular
        .module('app')
        .factory('ListingFactory', ListingFactory);

    ListingFactory.$inject = ['$http', '$q', 'apiUrl', '$stateParams'];

    /* @ngInject */
    function ListingFactory($http, $q, apiUrl, $stateParams) {
        var service = {
            getListings: getListings,
            grabListing: grabListing
        };

        return service;

        function getListings(search) {
            console.log(search);
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Listings/SearchListings',
                    params: {
                        city: search.city,
                        zipCode: search.zipCode,
                        minimumRent: search.minimumPrice,
                        maximumRent: search.maximumPrice,
                        bedroom: search.bedroom,
                        bathroom: search.bathroom
                    }
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log('SEARCHED PROPERTIES', response);
                        //toastr.success("Search match!");

                    },
                    function(error) {
                        defer.reject(error);
                        //toastr.error(error);
                    }
                );

            return defer.promise;
        }

        function grabListing(listingId) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Listings/' + listingId
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                    },
                    function(error) {
                        defer.reject(error);
                    }
                );
            return defer.promise;
        }


    }
})();
