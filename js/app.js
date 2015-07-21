var app = angular.module('homeApp', []);
// app.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/Life', {
//         templateUrl: 'pages/intro.html',
//         controller: 'homeCtrl'
//       }).
//       when('/showOrders', {
//         templateUrl: 'pages/intro.html',
//         controller: 'homeCtrl'
//       }).
//       otherwise({
//         templateUrl: 'pages/intro.html',
//         controller: 'homeCtrl'
//       });
//   }]);

app.controller('homeCtrl', function($scope) {
	$scope.imagesource = [
				{"datathumb": "./images/slides/thumbs/bridge.jpg", "datasrc": "./images/slides/bridge.jpg"}, 
				{"datathumb": "./images/slides/thumbs/leaf.jpg", "datasrc": "./images/slides/leaf.jpg"}, 
				{"datathumb": "./images/slides/thumbs/road.jpg", "datasrc": "./images/slides/road.jpg"}, 
				{"datathumb": "./images/slides/thumbs/sea.jpg", "datasrc": "./images/slides/sea.jpg"}, 
				{"datathumb": "./images/slides/thumbs/shelter.jpg", "datasrc": "./images/slides/shelter.jpg"}, 
				{"datathumb": "./images/slides/thumbs/tree.jpg", "datasrc": "./images/slides/tree.jpg"}		]
})
.directive('camSlider', function($timeout) {
        return function(scope, el, attrs) {
            $timeout((function() {
                el.camera({
                    thumbnails: true
                })
            }), 100)
        }
})
