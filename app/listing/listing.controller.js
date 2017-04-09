(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingController', ListingController);

    ListingController.$inject = ['ListingFactory', 'SweetAlert', 'localStorageService', 'UserFactory'];

    /* @ngInject */
    function ListingController(ListingFactory, SweetAlert, localStorageService, UserFactory) {
        var vm = this;




        vm.searchHandler = function() {
            var user = localStorageService.get('localUserName');
            console.log('loggedin', user);
            ListingFactory.getListings(vm.search)
                .then(
                    function(response) {
                        vm.listings = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }
    }
})();
