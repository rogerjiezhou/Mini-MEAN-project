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
      console.log("delete" + messageID);
      var deferred = $q.defer();
      var messages = getMessage();
      for(var key in messages) {
        if(messages[key].id == messageID){
          messages.splice(key ,1);
          localStorage.messages = JSON.stringify(messages);
          break;
        }
      }
      deferred.resolve(messages);
      return deferred.promise;
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