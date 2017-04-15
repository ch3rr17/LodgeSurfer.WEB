(function() {
    'use strict';

    angular
        .module('app')
        .factory('LocalStorageFactory', LocalStorageFactory);

    LocalStorageFactory.$inject = ['localStorageService'];

    /* @ngInject */
    function LocalStorageFactory(localStorageService) {
        var service = {
            saveKey: saveKey,
            getKey: getKey,
            clear: clear
        };
        return service;

        ////////////////

        function saveKey(key, val) {
            return localStorageService.set(key, val);
        }

        function getKey(key) {
            return localStorageService.get(key);
        }

        function clear() {
            return localStorageService.clearAll();
        }

    }
})();
