(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingDetailController', ListingDetailController);

    ListingDetailController.$inject = ['ListingFactory', 'LocalStorageFactory', 'localStorageService', '$stateParams', '$state', 'SweetAlert'];

    /* @ngInject */
    function ListingDetailController(ListingFactory, LocalStorageFactory, localStorageService, $stateParams, $state, SweetAlert) {
        var vm = this;


        // init();
        //
        // function init() {
        //     var user = localStorageService.getKey('userId');
        //     console.log('loggedin', user);
        // }

        //gets more details on a listing
        vm.getDetails = function() {
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            ListingFactory.grabListing($stateParams.listingId).then(
                function(response) {
                    vm.detailResponse = response.data;
                    console.log(response.data);
                },
                function(error) {
                    console.log(error);
                }

            );
        }
        vm.getDetails();

        //Add a favorite to a listing
        vm.addFavorite = function(listingId) {
            console.log('detail controller user', LocalStorageFactory);
            var favorite = {
                "ListingId": listingId,
                "UserId": LocalStorageFactory.getKey('userId')
            };
            ListingFactory.newFavorite(favorite)
                .then(
                    function(response) {
                        console.log('ADDED LISTING AS FAVORITE', response.data);
                        SweetAlert.swal("Added listing as a favorite!", "sucess");
                    },
                    function(error) {
                        console.log("FAILURE TO ADD AS FAVORITE", error);
                        SweetAlert.swal("Failed to add listing as a favorite", "error");
                    }
                );

        }

        //logout user
        vm.logOut = function() {
            $state.go('home');
            LocalStorageFactory.clear();
            SweetAlert.swal("Logged out successfully!", "Please log in again if you want to add a listing", "success");
        }
    }
})();
