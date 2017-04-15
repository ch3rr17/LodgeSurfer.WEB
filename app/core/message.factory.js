(function() {
    'use strict';

    angular
        .module('app')
        .factory('MessageFactory', MessageFactory);

    MessageFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function MessageFactory($http, $q, apiUrl) {
        var service = {
            getConversations: getConversations,
            getMessages: getMessages,
            addConvo: addConvo,
            addMessage: addMessage
        };

        return service;

        //get all messages for each conversation
        function getConversations(userId) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Messages/GetMessagesByUser?userId=' + userId
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response)
                    })
                .catch(
                    function(error) {
                        console.log(error)
                    })
            return defer.promise;
        }

        //get all messages for each user
        function getMessages(convoId) {
            var defer = $q.defer();
            $http({
                    method: 'GET',
                    url: apiUrl + 'Messages/GetMessagesByConvo?convoId=' + convoId
                })
                .then(
                    function(response) {
                        defer.resolve(response);
                        console.log(response)
                    })
                .catch(
                    function(error) {
                        console.log(error)
                    })
            return defer.promise;
        }

        function addConvo(convo) {
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
                    })
                .catch(
                    function(error) {
                        console.log(error)
                    })
            return defer.promise;
        }

        function addMessage(message) {
            var defer = $q.defer();
            $http({
                    method: 'POST',
                    url: apiUrl + 'messages',
                    data: message
                })
                .then(
                    function(response) {
                        console.log(response);
                        defer.resolve(response);
                    })
                .catch(
                    function(error) {
                        console.log(error)
                    })
            return defer.promise;
        }

    }
})();
