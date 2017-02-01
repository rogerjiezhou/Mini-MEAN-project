(function () {
    'use strict';
 
    angular
        .module('myapp')
        .factory('UserService', UserService);
 
    UserService.$inject = ['$q','$filter', '$timeout', '$rootScope', '$http'];


  function UserService($q, $filter, $timeout, $rootScope, $http) {
    var UserService = {};

    UserService.GetByUsername = GetByUsername;
    UserService.ValidateRegister = ValidateRegister;
    UserService.Login = Login;
    UserService.CreateUser = CreateUser;
    UserService.UpdateUser = UpdateUser;

    return UserService;
   
    function ValidateRegister(user) {
      var deferred = $q.defer();

      $timeout(function() {
        GetByUsername(user.username)
          .then(function(duplicateUser) {
            if(duplicateUser !== null){
              deferred.resolve({success: false, message: 'Username "' + user.username + '" is already taken'})
            } else {
              deferred.resolve({success: true})
            }
          });

      }, 500);

      return deferred.promise;
    }

    function CreateUser(user) {
      $http.post('/regiter_user', user).then(handleSuccess, handleError('Error creating user'));    
    }

    function Login(username, password ,callback) {
      var response;
      LoginCheck(username, password)
        .then(function(response) {
          if(response.success){
            response = { success: true }
          } else {
            response = { success: false, message: 'Username or password is incorrect' };
          }
          callback(response);
        })
    }

    function LoginCheck(username, password) {
      return $http.get('/login_check/', {params: {username:username,password:password}}).then(handleSuccess, handleError('Error finding user by username'));
    }

    function GetByUsername(username) {
      return $http.get('/user/' + username).then(handleSuccess, handleError('Error finding user by username'));
    }

    function UpdateUser(id, user) {
      return $http.put('/updateUser/', {params: {id:id,user:user}}).then(handleSuccess, handleError('Error update user'));
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