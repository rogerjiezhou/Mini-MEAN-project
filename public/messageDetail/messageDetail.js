(function () {
    'use strict';
 
    angular
        .module('myapp')
        .controller('messageDetail', messageDetail);
 
    messageDetail.$inject = ['$scope', 'MessageService', '$rootScope', '$state', '$stateParams', '$filter'];


  function messageDetail($scope, MessageService, $rootScope, $state, $stateParams, $filter) {
    $scope.replyMessage = {};
    $scope.replyMessage.description = 'Enter reply here...';
    $rootScope.reply = false;
    $scope.message = {};

    MessageService.GetMessageById($stateParams.id)
      .then(function(message) {
        $scope.message = message;
    });

    $scope.detele = function() {
      MessageService.DeleteMessage($stateParams.id)
        .then(function(message) {
          $state.go('home.message');
      })
    }

    $scope.replyMethod = function() {
      $rootScope.reply = true;
    }

    $scope.submitReply = function() {

      $scope.replyMessage.sender = $rootScope.globals.currentUser.username;
      $scope.replyMessage.sender_img = $scope.message.recipient_img;
      $scope.replyMessage.recipient = $scope.message.sender;
      $scope.replyMessage.recipient_img = $scope.message.sender_img;
      $scope.replyMessage.title = $scope.message.title;
      $scope.replyMessage.important = '0';
      $scope.replyMessage.created_at = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
      $scope.replyMessage.reply = [];

      MessageService.AddMessage($scope.replyMessage).then(function(res){});
      MessageService.AddComment($stateParams.id, $scope.replyMessage).then(function(res){});

      $rootScope.reply = false;
      $state.reload();
    }


    $scope.isImportant = function(message) {
      if(message.important == '1')
        return true;
      else
        return false;
    }

    $scope.flag = function(id, event){
      var value = event.target.attributes.src.value;
      var important;
      if(value == '/app-content/img/clicked.png'){
        event.target.attributes.src.value = "/app-content/img/unclicked.png";
        important = '0';
      }
      else{
        event.target.attributes.src.value = "/app-content/img/clicked.png";
        important = '1';
      }
      
      MessageService.UpdateImportant(id, important).then(function(err, res){});
    }
  }

})();