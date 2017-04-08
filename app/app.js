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

        .config(function(filepickerProvider) {
            filepickerProvider.setKey('A8V75El9QSy0yx4BJmkL7z');
        })

        .config(function(socialProvider) {

            socialProvider.setFbKey({
                appId: "183321228844208",
                apiVersion: "v.28"
            })
        })


        .config(function($stateProvider, $urlRouterProvider, socialProvider) {
            $urlRouterProvider.otherwise('home');

            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html'
            })

            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'app/user/login.html',
                controller: 'UserController as vm'
            })

            $stateProvider.state('profile', {
                url: '/profile',
                templateUrl: 'app/user/profile.html',
                controller: 'UserController as vm'
            })

            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'app/user/register.html',
                controller: 'UserController as vm'
            })


            $stateProvider.state('listing', {
                url: '/listing',
                templateUrl: 'app/listing/listing.grid.html',
                controller: 'ListingController as vm'
            })

            $stateProvider.state('addListing', {
                url: '/addListing',
                templateUrl: 'app/listing/listing.html',
                controller: 'ListingController as vm'
            })

            $stateProvider.state('listingDetail', {
                url: '/listingDetail',
                templateUrl: 'app/listing/listing.detail.html',
                controller: 'ListingDetailController as vm'
            })



            $stateProvider.state('favorite', {
                url: '/favorite',
                templateUrl: 'app/favorite/favorite.html',
                controller: 'FavoriteController as vm'
            })

            $stateProvider.state('addMessage', {
                url: '/addMessage',
                templateUrl: 'app/message/message.form.html',
                controller: 'MessageController as vm'
            })

            $stateProvider.state('message', {
                url: '/message',
                templateUrl: 'app/message/message.html',
                controller: 'MessageController as vm'
            })


        })

        .value('apiUrl', 'http://localhost:61768/api/')
})();
