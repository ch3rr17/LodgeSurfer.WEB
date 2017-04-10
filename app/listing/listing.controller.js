(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingController', ListingController);

    ListingController.$inject = ['ListingFactory', 'UserFactory', 'LocalStorageFactory', 'localStorageService', 'SweetAlert', '$state'];

    /* @ngInject */
    function ListingController(ListingFactory, UserFactory, LocalStorageFactory, localStorageService, SweetAlert, $state) {
        var vm = this;


        vm.getListings = function() {
            ListingFactory.getAllListings()
                .then(
                    function(response) {
                        vm.availableListings = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error)
                    }
                );
        }

        vm.getListings();

        vm.searchHandler = function() {
            //  var user = localStorageService.get('localUserId');
            //console.log('USER in listing', vm.userResponse.userId);
            //console.log('LOGGED IN AS:', user);
            //console.log('LOCALSTORAGESERVICE', localStorageService);
            //console.log('LOCALSTORAGEFACTORY', LocalStorageFactory);
            //init();
            //
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            ListingFactory.getListings(vm.search)
                .then(
                    function(response) {
                        vm.listings = response.data;
                        console.log(response.data);
                        //SweetAlert.swal("You are logged in!", "sucess");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        vm.logOut = function() {
            $state.go('home');
            LocalStorageFactory.clear();
            SweetAlert.swal("Logged out successfully!", "Please log in again if you want to add a listing", "success");
        }
    }
})();
