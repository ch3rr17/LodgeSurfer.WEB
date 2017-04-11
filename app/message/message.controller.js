(function() {
    'use strict';

    angular
        .module('app')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['MessageFactory', 'SweetAlert', 'LocalStorageFactory', 'UserFactory', '$state', '$stateParams'];

    /* @ngInject */
    function MessageController(MessageFactory, SweetAlert, LocalStorageFactory, UserFactory, $state, $stateParams) {
        var vm = this;
        vm.message = {};


        vm.getMessage = function() {
            //  var user = localStorageService.get('localUserId');
            //console.log('USER in listing', vm.userResponse.userId);
            //console.log('LOGGED IN AS:', user);
            //console.log('LOCALSTORAGESERVICE', localStorageService);
            //console.log('LOCALSTORAGEFACTORY', LocalStorageFactory);
            //init();
            //
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            MessageFactory.getMessages(user)
                .then(
                    function(response) {
                        vm.messages = response.data;
                        console.log(response.data);
                        //SweetAlert.swal("You are logged in!", "sucess");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        vm.addConvo = function() {
            var convo = {
                userOneId: LocalStorageFactory.getKey('userId'),
                userTwoId: $stateParams.listingUserId
            };
            console.log(convo);
            MessageFactory.newConvo(convo)
                .then(
                    function(response) {
                        console.log(convo);
                        console.log(response.data);
                        var convoId;
                        convoId = response.data.conversationId;

                        var message = {
                            ConversationId: convoId,
                            UserId: response.data.userOneId,
                            Subject: vm.message.subject,
                            MessageText: vm.message.messageText,
                            MessageTime: new Date()
                        };

                        console.log(message);
                        vm.addMessage(message);

                    },
                    function(error) {
                        console.log(error);
                        console.log(vm.message);
                    }
                );

        }

        vm.addMessage = function(message) {
            console.log(message);
            MessageFactory.newMessage(message)
                .then(
                    function(response) {
                        console.log(response.data);
                        SweetAlert.swal("Your message has been sent!");
                        $state.go('message');
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

    }
})();
