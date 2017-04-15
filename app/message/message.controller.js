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
        vm.r = [];
        vm.s = [];
        vm.nameInitial = [];

        var user = LocalStorageFactory.getKey('userId');
        console.log('logged in as: ', user);

        var convoId = $stateParams.convoId;
        console.log("StateParams assignment convoId", convoId);

        var subject = $stateParams.subj;
        console.log("StateParams assignment subject", subject);

        vm.getMessage = function() {
            MessageFactory.getMessages(convoId)
                .then(
                    function(response) {
                        vm.messages = response.data;
                        console.log(response.data);

                        //Iterates to each message finding the first and last name of the user, concatenates them as one variable, then splits other characters then returns
                        //the initials of the first and last name of the user (e.g. 'John Doe turns into - JD')
                        for (var i = 0; i < vm.messages.length; i++) {
                            var name = vm.messages[i].firstName + "+" + vm.messages[i].lastName;
                            var initials = name.match(/\b\w/g) || [];
                            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
                            console.log('NAME:', initials);
                            vm.nameInitial.push(initials);
                            console.log('IN:', vm.initials);
                        }
                        //OPTIONAL CODE to seperate the sender and receiver left and right
                        //DELETE IF NOT NEEDED
                        // for (var i = 0; i < vm.messages.length; i++) {
                        //     if (vm.messages[i].userTwoId == LocalStorageFactory.getKey("userId")) {
                        //         vm.r.push(vm.messages[i]);
                        //         console.log('R', vm.r);
                        //     } else {
                        //         vm.s.push(vm.messages[i]);
                        //         console.log('S', vm.s);
                        //     }
                        // }
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }
        vm.getMessage();


        vm.newReply = function() {

            var message = {
                ConversationId: convoId,
                UserId: user,
                Subject: subject,
                MessageText: vm.message.replyText,
                MessageTime: new Date()
            };

            console.log(message);
            MessageFactory.addMessage(message)
                .then(
                    function(response) {
                        console.log("SUCCESS MESSAGE SENT", response.data);
                        SweetAlert.swal("OH YEAH!", "Your message has been sent!", "success");
                        $state.go('message');
                        vm.message.replyText = "";
                    })
                .catch(
                    function(error) {
                        console.log("FAILED TO SEND MESSAGE", error);
                        SweetAlert.swal("FAILED", "Your message was not sent!", "error");
                    });
        }

        //logout user
        vm.logOut = function() {
            $state.go('home');
            LocalStorageFactory.clear();
            SweetAlert.swal("Logged out successfully!", "Please log in again if you want to add a listing", "success");
        }

    }
})();
