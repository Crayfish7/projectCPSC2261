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
          url : $scope.url,
          likes : 0 
          //like counter?
        };
        $http.put('http://52.25.213.221:1337/messages/post', dataObj).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            alert(JSON.stringify(data));
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
    });
