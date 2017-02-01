(function () {
    'use strict';
 
    angular
        .module('myapp')
        .controller('message', message);

    message.$inject = ['$scope', 'MessageService', '$http', '$rootScope', '$state'];

  function message($scope, MessageService, $http, $rootScope, $state) {
    $rootScope.messages = [];
    
    
    MessageService.GetMessages().then(function(data) {
      $rootScope.messages = data;
    })


    $scope.isImportant = function(message) {
      if(message.important == '1')
        return true;
      else
        return false;
    }

    $scope.flag = function(id, event){
      var value = event.target.attributes.src.value;
      if(value == '/app-content/img/clicked.png')
        event.target.attributes.src.value = "/app-content/img/unclicked.png";
      else
        event.target.attributes.src.value = "/app-content/img/clicked.png";
    }

    $scope.goto = function(id) {
      $state.go('home.messageDetail', {id: id})
    }
  }
})();