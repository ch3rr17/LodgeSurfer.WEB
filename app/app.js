(function() {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'oitozero.ngSweetAlert',
            'LocalStorageModule',
            'socialLogin',
            'angular-filepicker'
        ])

        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('search');

            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'app/user/register.html',
                controller: 'UserController as vm'
            })

            $stateProvider.state('search', {
                url: '/search',
                templateUrl: 'app/search/search.html',
                controller: 'SearchController as vm'
            })

            $stateProvider.state('search,detail', {
                url: '/searchDetails',
                templateUrl: 'app/search/search.grid.html',
                controller: 'SearchDetailController as vm'
            })

            $stateProvider.state('listing', {
                url: '/listing',
                templateUrl: 'app/listing/listing.html',
                controller: 'ListingController as vm'
            })

            $stateProvider.state('listing.detail', {
                url: '/listingDetail',
                templateUrl: 'app/listing/listing.grid.html',
                controller: 'ListingDetailController as vm'
            })

            $stateProvider.state('favorite', {
                url: '/favorite',
                templateUrl: 'app/favorite/favorite.html',
                controller: 'FavoriteController as vm'
            })


        })
})();
