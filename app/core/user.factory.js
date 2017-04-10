(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function UserFactory($http, $q, apiUrl) {
        var service = {
            grabUsers: grabUsers,
            getUser: getUser,
            newUser: newUser
        };

        return service;

        //get all users
        function grabUsers() {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Users'
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

    }
})();
