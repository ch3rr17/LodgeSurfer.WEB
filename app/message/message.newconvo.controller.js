(function() {
    'use strict';

    angular
        .module('app')
        .controller('MessageNewConvoController', MessageNewConvoController);

    MessageNewConvoController.$inject = ['MessageFactory', 'SweetAlert', 'LocalStorageFactory', 'UserFactory', '$state', '$stateParams'];

    /* @ngInject */
    function MessageNewConvoController(MessageFactory, SweetAlert, LocalStorageFactory, UserFactory, $state, $stateParams) {
        var vm = this;
        vm.message = {};

        vm.newConvo = function() {
            var convo = {
                userOneId: LocalStorageFactory.getKey('userId'),
                userTwoId: $stateParams.listingUserId
            };
            console.log(convo);
            MessageFactory.addConvo(convo)
                .then(
                    function(response) {
                        console.log(convo);
                        console.log(response.data);

                        var message = {
                            ConversationId: response.data.conversationId,
                            UserId: response.data.userOneId,
                            Subject: vm.message.subject,
                            MessageText: vm.message.messageText,
                            MessageTime: new Date()
                        };

                        console.log(message);
                        vm.newMessage(message);

                    },
                    function(error) {
                        console.log(error);
                        console.log(vm.message);
                    }
                );

        }

        vm.newMessage = function(message) {
            console.log(message);
            MessageFactory.addMessage(message)
                .then(
                    function(response) {
                        console.log("SUCCESS MESSAGE SENT", response.data);
                        SweetAlert.swal("OH YEAH!", "Your message has been sent!", "success");
                        $state.go('messageConvo');
                    })
                .catch(
                    function(error) {
                        console.log("FAILED TO SEND MESSAGE", error);
                        SweetAlert.swal("FAILED", "Your message was not sent!", "error");
                    });
        }

    }
})();
