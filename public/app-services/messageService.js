(function () {
    'use strict';
 
    angular
        .module('myapp')
        .factory('MessageService', MessageService);
 
    MessageService.$inject = ['$q','$filter', '$timeout', '$rootScope', '$http'];

  function MessageService($q, $filter, $timeout, $rootScope, $http) {
    var MessageService = {};

    MessageService.GetMessageById = GetMessageById;
    MessageService.DeleteMessage = DeleteMessage;
    MessageService.GetMessages = GetMessages;
    
    return MessageService;
    
    function GetMessages() {
      return $http.get('/messages').then(handleSuccess, handleError('Error getting message'));
    }

    function GetMessageById(messageID) {
      return $http.get('/messageDetail/' + messageID).then(handleSuccess, handleError('Error getting message'));
    }

    function DeleteMessage(messageID) {
      return $http.delete('/deleteMessage/' + messageID).then(handleSuccess, handleError('Error getting message'));
    }

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function() {
        return { success: false, message: error};
      };
    }
  }
})();