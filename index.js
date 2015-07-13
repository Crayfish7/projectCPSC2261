angular.module('myApp',['ui.bootstrap']);
   angular.module('myApp').controller('random_post_controller', function($scope,$http){
      var random_post = [];
      //calls fetch_post two times to save into random_post array
      $scope.fetch_post = function(){
         $http.get('http://52.25.213.221:1337/messages/main').success(function(response){
            $scope.random_post.push(response.data);
         });
         $http.get('http://52.25.213.221:1337/messages/main').success(function(response){
            $scope.random_post.push(response.data);
         });
      }
   });
