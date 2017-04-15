(function() {
    'use strict';

    angular
        .module('app')
        .factory('ListingFactory', ListingFactory);

    ListingFactory.$inject = ['$http', '$q', 'apiUrl', '$stateParams'];

    /* @ngInject */
    function ListingFactory($http, $q, apiUrl, $stateParams) {
        var service = {
            getAllListings: getAllListings,
            grabHostListing: grabHostListing,
            getListings: getListings,
            grabListing: grabListing,
            addListing: addListing,
            updateHostListing: updateHostListing,
            newFavorite: newFavorite
        };


        return service;

        //get all listings
        function getAllListings() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Listings'
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                    },
                    function(error) {
                        defer.reject(error);
                        console.log(error);
                    }
                );

            return defer.promise;
        }

        function grabHostListing(userId) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'listings' + '/GetSearchListingsByUser?userId=' + userId
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                    },
                    function(error) {
                        defer.reject(error);
                        console.log(error);
                    }
                );

            return defer.promise;

        }

        //search for listings based on given entry from user by parameter
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

        //view more listing details
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

        function addListing(newList) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'Listings',
                    data: newList
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                    },
                    function(error) {
                        defer.reject(error);
                    }
                );

            return defer.promise;

        }

        function updateHostListing(hostListing) {
            return $http
                .put(apiUrl + 'Listings/' + hostListing.listingId, hostListing);
        }
        //add listing as a favorite
        function newFavorite(favorite) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'Favorites',
                    data: favorite
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response);
                    },
                    function(error) {
                        defer.reject(error);
                        console.log(error)
                    }
                );

            return defer.promise;

        }


    }
})();
