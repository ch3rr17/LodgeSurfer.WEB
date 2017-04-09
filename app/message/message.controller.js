(function() {
    'use strict';

    angular
        .module('app')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['MessageFactory', 'SweetAlert', 'localStorageService', 'UserFactory'];

    /* @ngInject */
    function MessageController(MessageFactory, SweetAlert, localStorageService, UserFactory) {
        var vm = this;
        vm.message = {};

        vm.addConvo = function() {
          var convo = {
            userOneId: 1,
            userTwoId: 2
//            userOneId: localStorageService.get('localUserId'),
//            userTwoId: vm.listing.userId
          }
            MessageFactory.newConvo(convo)
                .then(
                    function(response) {
                        console.log(response.data);
                        console.log(vm.message);
                        console.log(response.data.conversationId);
                        vm.addMessage(response.data.conversationId, vm.message);
                    },
                    function (error) {
                        console.log(error);
                        console.log(vm.message);
                    }
                );
        }

        vm.addMessage = function(userId, conversationId) {
          var userId = 1;
          console.log(userId);

            MessageFactory.newMessage(userId, conversationId, vm.message)
                .then(
                    function(response) {
                        console.log(response.data);
                        vm.message.push(response.data);
                        SweetAlert.swal("Your message has been sent");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

    }
})();
