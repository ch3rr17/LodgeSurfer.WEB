(function() {
    'use strict';

    angular
        .module('app')
        .controller('messageController', messageController);

    messageController.$inject = ['MessageFactory', 'SweetAlert'];

    /* @ngInject */
    function messageController(MessageFactory, SweetAlert) {
        var vm = this;

        vm.addMessage = function(message) {
            MessageFactory.newMessage(message)
                .then(
                    function(response) {
                        console.log(response.data);
                        SweetAlert.swal("Your message has been sent");
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

    }
})();
