(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingController', ListingController);

    ListingController.$inject = ['ListingFactory', 'SweetAlert'];

    /* @ngInject */
    function ListingController(ListingFactory, SweetAlert) {
        var vm = this;

        vm.grabListings = function() {
            ListingFactory.getListings()
                .then(
                    function(response) {
                        vm.listings = response.data;
                        console.log(response.data);
                        SweetAlert.swal("You've got listings!");
                    },
                    function(error) {
                        console.log(error);
                        // SweetAlert.swal({
                        //         title: "Are you sure?",
                        //         text: "Your will not be able to recover this imaginary file!",
                        //         type: "error",
                        //         showCancelButton: true,
                        //         confirmButtonColor: "red",
                        //         confirmButtonText: "Yes, delete it!",
                        //         closeOnConfirm: false
                        //     },
                        //     function() {
                        //         SweetAlert.swal("Booyah!");
                        //     });
                    }
                );
        }

        vm.grabListings();
    }
})();
