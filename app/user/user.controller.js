(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', 'SweetAlert', 'filepickerService', 'LocalStorageFactory', 'localStorageService', '$state', '$rootScope'];

    /* @ngInject */
    function UserController(UserFactory, SweetAlert, filepickerService, LocalStorageFactory, localStorageService, $state, $rootScope) {
        var vm = this;


        //get user profile
        vm.getUser = function() {
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            UserFactory.grabUser(user)
                .then(
                    function(response) {
                        vm.userInfo = response.data;
                        console.log(response.data);
                        // SweetAlert.swal("Welcome back!", vm.user.firstName, "success");
                    }
                )
                .catch(function(error) {
                    SweetAlert.swal("Please login", "Enter your Email Address and Password to login", "info");
                    $state.go('login');
                });
        }

        vm.getUser();

        //update user profile
        vm.updateProfile = function(user) {
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            UserFactory.updateUser(user)
                .then(
                    function() {
                        console.log('UPDATED PROPERTIES', response.data);
                    },
                    function(error) {
                        console.log(error);
                        SweetAlert.swal("Failure to update profile", "", "error");
                    }
                );
        }


        //get favorited listing
        vm.getFavorite = function() {
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            UserFactory.getFavorite(user)
                .then(
                    function(response) {
                        vm.favoriteResult = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }
        vm.getFavorite();


        // //success
        // vm.loginSuccess = function() {
        //     localStorageService.get('localUserId', vm.userResponse.userId);
        //     SweetAlert.swal("Welcome Back " + firstName, "", "success");
        //     //$rootScope.logIn();
        //     $state.go('listing');
        //
        // }
        //
        function setStorage(key, value) {
            LocalStorageFactory.saveKey(key, value)
            console.log("LOGIN SUCCESSFUL!");
            return;
        }

        //Login for regular users
        vm.login = function() {
            var userLogin = {
                'EmailAddress': vm.login.emailAddress,
                'Password': vm.login.password
            };
            UserFactory.getUser(userLogin)
                .then(
                    function(response) {
                        console.log('USERLOGIN', userLogin);
                        console.log('USERDATA', response.data);
                        console.log("I'm here!");
                        vm.userResponse = response.data;
                        // console.log('USERVAR', response.data);
                        console.log('USERVAR', vm.userResponse);
                        if (vm.userResponse[0] == null) {
                            $state.go('register');
                        } else {
                            //LocalStorageFactory.setKey('localUserId', vm.userResponse.userId);
                            //vm.loginSuccess(vm.userResponse[0].userId, vm.userResponse[0].firstName);
                            //console.log(vm.loginSuccess);

                            setStorage('emailAddress', vm.userResponse[0].emailAddress);
                            setStorage('userId', vm.userResponse[0].userId);
                            console.log(vm.userResponse[0].emailAddress);
                            console.log(vm.userResponse[0].userId);
                            swal("Welcome Back", vm.userResponse[0].firstName, "success")
                            $state.go('listing');
                        }
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        //FACEBOOK LOGIN
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


        //Register a new user
        vm.addUser = function() {
            var newUser = {

                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                emailAddress: vm.user.emailAddress,
                zipCode: vm.user.zipCode,
                contactPhone: vm.user.contactPhone,
                birthDate: vm.user.birthDate,
                username: vm.user.username,
                password: vm.user.password

            }
            UserFactory.newUser(newUser)
                .then(
                    function(response) {
                        $state.go('listing');
                        console.log('REGISTERED SUCCESSFULLY', response.data);
                        SweetAlert.swal("Registration successful!", "Search for available listings", "success");
                    },
                    function(error) {
                        console.log(error);
                        SweetAlert.swal("Failure to register!", "Please try again", "error");
                    }
                );
        }



        //Upload Photo
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

        //logout user
        vm.logOut = function() {
            $state.go('home');
            LocalStorageFactory.clear();
            SweetAlert.swal("Logged out successfully!", "Please log in again if you want to add a listing", "success");
        }


    }
})();
