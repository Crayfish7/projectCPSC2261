    var myApp = angular.module('myApp', []);
    myApp.controller('postController', function($scope, $http) {

      var dataobj = {};
      
      $scope.postStory = function() {
        dataObj = {
          profile_id : $scope.profile_id,
          name : $scope.userName,
          email : $scope.email,
          title : $scope.storyTitle,
          story : $scope.story,
          url : $scope.url
        };
      $http({
         url: 'http://jsonstub.com/message/post',
         method: 'PUT',
         dataType: 'json', 
         data: dataobj,         
         headers: {
         'Content-Type': 'application/json',
         'JsonStub-User-Key': 'd42e4a29-7430-4b5f-a3dc-a9b22f0e14ec',
         'JsonStub-Project-Key': 'a9707087-df35-41f9-8e9e-6a310e9eeee2'
         }
      }).success(function (data, status, headers, config) {
         alert(JSON.stringify(data, null, 4));
      });
    // 'dataType' and 'data' are explicitly required for the Content-Type header to be sent
