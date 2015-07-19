    //javascript for post html
    //this function is completed and tested - Nowel

    var postApp = angular.module('postApp', []);
    var setting = { headers: { 'Content-Type': 'application/json' } };

    postApp.controller('postController', function($scope, $http, $location) {

      var dataobj = {};

      //extract value from <input> and send to back end
      $scope.postStory = function() {

        dataObj = {
          profile_id : $scope.profile_id,
          name : $scope.userName,
          email : $scope.email,
          title : $scope.storyTitle,
          story : $scope.story,
          url : $scope.img_url,
          likes : 0
        };

        $http.put('http://52.26.201.47:1338/messages/put', dataObj, setting).
          success(function(data, status, headers, config) {
            // Need to direct to a success page
            // ref - http://stackoverflow.com/questions/25737540/angular-js-redirecting-to-another-page
            window.location = "/weirdo/post_success.html";
          }).
          error(function(data, status, headers, config) {
            alert("Not success");
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
      };

    });

   //javascript for index html
   angular.module('indexApp',['ui.bootstrap']);
    angular.module('indexApp').controller('random_post_controller', function($scope,$http){
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
      
   //javascript for view html
		var viewApp = angular.module('viewApp', ['ui.bootstrap']);
		  viewApp.controller('view_controller', function($scope, $html){

            //fetch all posts
         		$scope.fetch_posts = function() {
              $http.get('http://52.26.201.47:1338/messages/all')
              .success(function(res){
                alert("get all posts is done");
                //$scope.random_post.push(response.data);
              });
            };

         		//for updating the like counter of the user's post
         		$scope.like_counter = function(user_id){
         			$http.post('http://52.25.213.221:1337/messages/post', dataObj).
          				success(function(data, status, headers, config) {
          					console.log(user_id+ "has been updated.");	
        				}).
        				error(function(data, status, headers, config) {
        					console.log(user_id+ "was unsuccessful.");
        				});
         		}
         		
         		//increments likes counter on the button
         		$scope.increment_like= function(post){
         			post.likes += 1;
         		}
		});
    // 'dataType' and 'data' are explicitly required for the Content-Type header to be sent
