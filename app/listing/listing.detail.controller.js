(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingDetailController', ListingDetailController);

    ListingDetailController.$inject = ['ListingFactory', '$stateParams'];

    /* @ngInject */
    function ListingDetailController(ListingFactory, $stateParams) {
        var vm = this;


        vm.getDetails = function() {
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
    }
})();
