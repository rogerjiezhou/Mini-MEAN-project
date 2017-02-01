(function () {
    'use strict';
 
    angular
        .module('myapp')
        .controller('profile', profile);
 
    profile.$inject = ['$scope', '$rootScope', 'UserService', '$location', '$timeout'];


  function profile($scope, $rootScope, UserService, $location, $timeout){

    $rootScope.userModel = {};
    $rootScope.userID;


      UserService.GetByUsername($rootScope.globals.currentUser.username)
        .then(function(user) {
          $rootScope.userID = user._id;
          delete user["_id"];
          $rootScope.userModel = user;
        });
  

    $rootScope.usernameValid = false;
    $rootScope.invalidated = false;
    $rootScope.typing = false;

    $scope.updateUser = function() {
      if($scope.profileForm.$valid){
        UserService.UpdateUser($rootScope.userID, JSON.stringify($rootScope.userModel))
          .then(function(res){
            return;
          })
       
        $rootScope.globals.currentUser.username = $rootScope.userModel.username;
      } else {
        alert("invalid username");
      }
      
    };
    // $scope.validateUsername = function() {
    //   if($rootScope.userModel.username != "" && 
    //       $rootScope.userModel.username != $rootScope.globals.currentUser.username) {
    //     $rootScope.typing = true;
    //     $rootScope.validated = false;
    //     $rootScope.invalidated = false;
    //     UserService.ValidateRegister($rootScope.userModel)
    //       .then(function(valid) {
    //         if(valid.success) {
    //           $rootScope.typing = false;
    //           $rootScope.invalidated = false;
    //           $rootScope.usernameValid = true;
    //           console.log("valid");
    //         } else {
    //           console.log("invalid");
    //           $rootScope.typing = false;
    //           $rootScope.invalidated = true;
    //           $rootScope.usernameValid = false;
    //         }
    //       }) 
    //   }
    //   else
    //     $rootScope.typing = false;
    //     $rootScope.validated = false;
    //     $rootScope.invalidated = false;
    // }
  }
})();