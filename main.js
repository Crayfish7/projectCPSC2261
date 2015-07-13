    //javascript for post html
    var postApp = angular.module('postApp', []);
    postApp.controller('postController', function($scope, $http) {

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
            console.log(status);
            console.log(dataObj);
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
         		$scope.like_counter = function(number){
         			
         			dataObj = {
          			profile_id : user_id,
          			name : user_name,
          			email : user_email,
          			title : user_title,
          			story : user_story,
          			url : user_url,
          			likes : number + user_likes;
        			};
         			$http.post('http://52.25.213.221:1337/messages/post', dataObj).
          				success(function(data, status, headers, config) {
          				console.log(user_id+ "has been updated.");	
        			}).
        				error(function(data, status, headers, config) {
        			});
         		}
		});
    // 'dataType' and 'data' are explicitly required for the Content-Type header to be sent
