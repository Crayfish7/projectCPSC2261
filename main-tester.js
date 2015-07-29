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
    var myIndexApp = angular.module('indexApp',['ui.bootstrap']);
    myIndexApp.controller('top_post_controller', function($scope,$http){
      $scope.top_post = [];
      //calls fetch_post two times to save into top_post array
      $scope.fetch_post = function(){
        $http.get('http://52.26.201.47:1338/messages/main',setting).success(function(response){
          $scope.top_post = response;
        }).
        error(function(data, status, headers, config) {
          alert("Top post failed.");
        });
      }
    });
      
   //javascript for view html
		var myViewApp = angular.module('viewApp', []);
		myViewApp.controller('view_controller', function($scope, $http){
      //fetch all posts
      $scope.fetch_posts = function() {

// 'dataType' and 'data' are explicitly required for the Content-Type header to be sent
    
$http({
    url: 'http://jsonstub.com/message/all',
    method: 'GET',
    dataType: 'json', 
    data: '',         
    headers: {
        'Content-Type': 'application/json',
        'JsonStub-User-Key': 'd42e4a29-7430-4b5f-a3dc-a9b22f0e14ec',
        'JsonStub-Project-Key': 'a9707087-df35-41f9-8e9e-6a310e9eeee2'
    }
}).success(function (res) {
    $scope.posts = res;
});


      };

      //for updating the like counter of the user's post
      //The like counter works now. - Lesley
      $scope.like_counter = function(post) {
        dataObj = { "profile_id": post.profile_id };
        //alert(dataObj.profile_id);
         $http.post('http://52.26.201.47:1338/messages/weirdness', dataObj, setting)
            .success(function(data, status, headers, config) {
    				console.log(dataObj.profile_id + "'s weird has been updated.");	
            })
            .error(function(data, status, headers, config) {
  					console.log(dataObj.profile_id+ "was unsuccessful.");
  				});
      };
      
      
      //increments likes counter on the button
      $scope.increment_like= function(post) {
         post.likes += 1;
      };
	});
    // 'dataType' and 'data' are explicitly required for the Content-Type header to be sent
