(function() {
    'use strict';

  angular
        .module('app')
        .factory('MessageFactory', MessageFactory);

  MessageFactory.$inject = ['$http', '$q', 'apiUrl'];

  /* @ngInject */
    function MessageFactory($http, $q, apiUrl) {
        var service = {
          newConvo: newConvo,
          newMessage: newMessage
        };

      return service;

      function newConvo(convo) {
          var defer = $q.defer();
          $http({
            method: 'POST',
            url: apiUrl + 'conversations',
            data: convo
          })
          .then(
            function(response) {
              defer.resolve(response);
              console.log(response);
            },
            function(error) {
              defer.reject(error);
            }
          );
          return defer.promise;

      }

      function newMessage(message) {
          var defer = $q.defer();
          $http({
            method: 'POST',
            url: apiUrl + 'messages',
            data: message
          })
          .then(
            function(response) {
              defer.resolve(response);
              console.log(response);
            },
            function(error) {
              defer.reject(error);
            }
          );
          return defer.promise;

      }
    }
})();
