(function() {
    'use strict';

    angular
        .module('app')
        .factory('ListingFactory', ListingFactory);

    ListingFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function ListingFactory($http, $q) {
        var service = {
            getListings: getListings
        };

        return service;

        function getListings() {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: 'listings'
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
        }

        return defer.promise;
    }
})();
