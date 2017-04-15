(function() {
    'use strict';

    angular
        .module('app')
        .controller('MessageConvoController', MessageConvoController);

    MessageConvoController.$inject = ['MessageFactory', 'SweetAlert', 'LocalStorageFactory', 'UserFactory', '$state', '$stateParams'];

    /* @ngInject */
    function MessageConvoController(MessageFactory, SweetAlert, LocalStorageFactory, UserFactory, $state, $stateParams) {
        var vm = this;

        vm.getConversation = function() {
            //  var user = localStorageService.get('localUserId');
            //console.log('USER in listing', vm.userResponse.userId);
            //console.log('LOGGED IN AS:', user);
            //console.log('LOCALSTORAGESERVICE', localStorageService);
            //console.log('LOCALSTORAGEFACTORY', LocalStorageFactory);
            //init();
            //
            var user = LocalStorageFactory.getKey('userId');
            console.log('logged in as: ', user);
            MessageFactory.getConversations(user)
                .then(
                    function(response) {
                        vm.conversations = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }
        vm.getConversation();

        //logout user
        vm.logOut = function() {
            $state.go('home');
            LocalStorageFactory.clear();
            SweetAlert.swal("Logged out successfully!", "Please log in again if you want to add a listing", "success");
        }

    }
})();
