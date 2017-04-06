(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function UserFactory($http, $q, apiUrl) {
        var service = {
            getUser: getUser
        };

        return service;

        function getUser() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'users'
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
