(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', 'SweetAlert', 'filepickerService', 'LocalStorageFactory', 'localStorageService', '$state'];

    /* @ngInject */
    function UserController(UserFactory, SweetAlert, filepickerService, LocalStorageFactory, localStorageService, $state) {
        var vm = this;

        vm.getUsers = function() {
            UserFactory.grabUsers()
                .then(
                    function(response) {
                        vm.users = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        vm.getUsers();



        vm.login = function() {
            // var user = localStorageService.get('localUserName');
            // console.log(user);
            var userLogin = {
                'EmailAddress': vm.login.emailAddress,
                'Password': vm.login.password
            };
            UserFactory.getUser(userLogin)
                .then(
                    function(response) {
                        console.log(response);
                        console.log("I'm here!");
                        var user = response.config.data;
                        console.log(response.config.data);
                        if (user[0] == null) {
                            $state.go('register');
                        } else {
                            $state.go('listing');
                        }
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }


        vm.uploadPhoto = function() {
            filepickerService.pick({
                    mimetype: 'image/*',
                    container: 'modal',
                    services: ['computer', 'facebook']
                },
                function onSuccess(Blob) {
                    console.log(Blob);
                    vm.photoUrl = Blob.url;
                })
        }
    }
})();
