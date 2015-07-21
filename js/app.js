var app = angular.module('homeApp', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/life', {
        templateUrl: './pages/life.html',
        controller: 'homeCtrl'
      }).
      when('/footprint', {
        templateUrl: './pages/footprint.html',
        controller: 'homeCtrl'
      }).
      otherwise({
      	//templateUrl doesn't work in this case because there is on onload event. but ng-include has and will do binding with the controller.
      	template: '<div ng-include src="templateUrl" onload="onsliderload()"></div>',
        controller: 'homeCtrl'
      });
  }]);


app.controller('homeCtrl', function($scope) {
	$scope.imagesource = [
				{"datathumb": "./images/slides/thumbs/bridge.jpg", "datasrc": "./images/slides/bridge.jpg"}, 
				{"datathumb": "./images/slides/thumbs/leaf.jpg", "datasrc": "./images/slides/leaf.jpg"}, 
				{"datathumb": "./images/slides/thumbs/road.jpg", "datasrc": "./images/slides/road.jpg"}, 
				{"datathumb": "./images/slides/thumbs/sea.jpg", "datasrc": "./images/slides/sea.jpg"}, 
				{"datathumb": "./images/slides/thumbs/shelter.jpg", "datasrc": "./images/slides/shelter.jpg"}, 
				{"datathumb": "./images/slides/thumbs/tree.jpg", "datasrc": "./images/slides/tree.jpg"}		];
	
	$scope.templateUrl = "./pages/intro.html";
	
	//this must be called to enable the slider. 
	//the time delay is necessary to make sure the element is in place. 
	$scope.onsliderload = function() {
		setTimeout(function(){
			jQuery('#camera_wrap_1').camera({
		 			time: 1000,
		 			transPeriod: 1000,
		 			height: '500px',
		 		});
		}, 50);
	}
})
//this will enable the camSlider, otherwise it won't work with angular
.directive('camSlider', function($timeout) {
        return function(scope, el, attrs) {
            $timeout((function() {
                el.camera({
                    thumbnails: true
                })
            }), 50)
        }
});
