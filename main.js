    //javascript for post html
    var postApp = angular.module('postApp', []);
    postApp.controller('postController', function($scope, $http) {

      var dataobj = {};
      
      //extract value from <input> and send to back end
      $scope.postStory = function() {
        dataObj = {
          profile_id : $scope.profile_id,
          name : $scope.userName,
          email : $scope.email,
          title : $scope.storyTitle,
          story : $scope.story,
          url : $scope.url,
          likes : 0
        };

        $http.put('http://52.26.201.47:1337/messages/put', dataObj).
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
    // 'dataType' and 'data' are explicitly required for the Content-Type header to be sent
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
		angular.module('viewApp', ['ui.bootstrap']);
		angular.module('viewApp').controller('view_controller', function($scope,$html){
			var posts = $scope.posts = [];
         		$scope.fetch_posts = function(){
            			$http({
               				url: 'http://52.25.213.221:1337/messages/all',
               				method: 'GET',
               				dataType: 'json', 
               				data: '',         
               				headers: {
                  				'Content-Type': 'application/json',
               				}
            			}).success(function (data, status, headers, config) {
         				for(var i=0;i<data.length;i++){
         					$scope.posts.push(data[i]);
         					console.log(data[i]);
         				}
            			});
         		}
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
