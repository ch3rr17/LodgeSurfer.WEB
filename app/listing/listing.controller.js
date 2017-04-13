(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingController', ListingController);

    ListingController.$inject = ['ListingFactory', 'UserFactory', 'LocalStorageFactory', 'localStorageService', 'SweetAlert', '$state', 'filepickerService'];

    /* @ngInject */
    function ListingController(ListingFactory, UserFactory, LocalStorageFactory, localStorageService, SweetAlert, $state, filepickerService) {
        var vm = this;

        vm.hideAddForm = false;
        //check if vm.listing is available
        if (!vm.listing) {
            vm.listing = {};
        }

        //get all availableListings
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

        //get listings for hosts
        vm.getHostListing = function() {
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            ListingFactory.grabHostListing(user)
                .then(
                    function(response) {
                        vm.hostListings = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            // .catch(function(error) {
            //     SweetAlert.swal("Please login", "Enter your Email Address and Password to login", "info");
            //     $state.go('login');
            // });
        }

        vm.getHostListing();

        // add a new listing
        vm.newListing = function() {
            var newList = {
                userId: LocalStorageFactory.getKey('userId'),
                listingName: vm.listing.listingName,
                listingImage: vm.listing.listingImage,
                listingDescription: vm.listing.listingDescription,
                address1: vm.listing.address1,
                address2: vm.listing.address2,
                city: vm.listing.city,
                state: vm.listing.state,
                zipCode: vm.listing.zipCode,
                contactPhone: vm.listing.contactPhone,
                price: vm.listing.price,
                bedroom: vm.listing.bedroom,
                bathroom: vm.listing.bathroom
            }
            console.log(newList);
            //console.log('localUserId')
            ListingFactory.addListing(newList)
                .then(
                    function(response) {
                        vm.availableListings.push(response.data);
                        console.log(response.data);
                        SweetAlert.swal("You've added a new listing!", "success");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        //add photo to listing
        //Upload Photo
        vm.uploadPhoto = function() {
            filepickerService.pick({
                    mimetype: 'image/*',
                    container: 'modal',
                    services: ['computer', 'facebook']
                },
                function onSuccess(Blob) {
                    console.log(Blob);
                    vm.listing.listingImage = Blob.url + "+" + Blob.filename;
                })
        }

        //update a listing
        vm.updateListing = function(hostListing) {
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            ListingFactory.updateHostListing(hostListing)
                .then(
                    function(response) {
                        console.log('UPDATED LISTING');
                    },
                    function(error) {
                        console.log('FAILURE TO UPDATE LISTING', error);
                    }
                );
        }

        //search for listings
        vm.searchHandler = function() {
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

        //Logout User
        vm.logOut = function() {
            $state.go('home');
            LocalStorageFactory.clear();
            SweetAlert.swal("Logged out successfully!", "Please log in again if you want to add a listing", "success");
        }
    }
})();
