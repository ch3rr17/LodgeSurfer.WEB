(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', 'SweetAlert', 'filepickerService', 'LocalStorageFactory', 'localStorageService', '$state', '$rootScope'];

    /* @ngInject */
    function UserController(UserFactory, SweetAlert, filepickerService, LocalStorageFactory, localStorageService, $state, $rootScope) {
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


        //Login for regular users
        vm.login = function() {
            var userLogin = {
                'EmailAddress': vm.login.emailAddress,
                'Password': vm.login.password
            };
            UserFactory.getUser(userLogin)
                .then(
                    function(response) {
                        console.log('USERDATA', response.data);
                        console.log("I'm here!");
                        var user = response.data;
                        console.log('USERVAR', response.data);
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

        vm.fbLogin = function() {
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response.name + '.');
                        $state.go('listing');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        }

        //Login for facebook user
        // $rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
        //     vm.userDetails = userDetails;
        //     console.log('FACEBOOKDEETS', userDetails);
        //
        //     var login = {
        //         'EmailAddress': userDetails.emailAddress,
        //         'Password': userDetails.uid
        //     };
        //     UserFactory.getUser(login)
        //         .then(
        //             function(response) {
        //                 var user = response.data;
        //                 console.log(response.data);
        //             },
        //             function(error) {
        //                 console.log(error);
        //             }
        //         );
        // })


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
