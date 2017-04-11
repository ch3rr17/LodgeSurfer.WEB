(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function UserFactory($http, $q, apiUrl) {
        var service = {
            grabUser: grabUser,
            getUser: getUser,
            newUser: newUser,
            getFavorite: getFavorite
        };

        return service;

        //get all users
        function grabUser(userId) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Users/' + userId
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response)
                    },
                    function(error) {
                        defer.reject(error);
                        console.log(error);
                    }
                );

            return defer.promise;
        }

        //match user login
        function getUser(userLogin) {
            return $http
                .post(apiUrl + 'Users/Login', userLogin);
        }

        //add a new user
        function newUser(user) {
            return $http
                .post(apiUrl + 'Users', user);
        }

        //get Favorites
        function getFavorite(userId) {
            console.log();
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Listings' + '/SearchFavorites/' + userId
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


    }
})();
