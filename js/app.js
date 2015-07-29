var app = angular.module('homeApp', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/life', {
        templateUrl: './pages/life.html',
        controller: 'homeCtrl'
      }).
      when('/footprint', {
        // templateUrl: './pages/footprint.html',
        template: '<div ng-include src="templateUrl" onload="onsliderload()"></div>',
        controller: 'footprintCtrl'
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

app.controller('footprintCtrl', function($scope) {
	$scope.templateUrl = "./pages/footprint.html";

	$scope.imagesource = [
				{"datathumb": "./images/slides/thumbs/bridge.jpg", "datasrc": "./images/slides/bridge.jpg"}, 
				{"datathumb": "./images/slides/thumbs/leaf.jpg", "datasrc": "./images/slides/leaf.jpg"}, 
				{"datathumb": "./images/slides/thumbs/tree.jpg", "datasrc": "./images/slides/tree.jpg"}		];
	
	//this must be called to enable the slider. 
	//the time delay is necessary to make sure the element is in place. 
	$scope.onsliderload = function() {
		setTimeout(function(){
			var map = new BMap.Map("baidumap");  
			map.centerAndZoom(new BMap.Point(8, 20), 4);
			map.addControl(new BMap.MapTypeControl());
			map.setCurrentCity("北京");          
			map.enableScrollWheelZoom(true);
			var points = [
				{x: 99.67, y: 6.35},//lankawei
				{x: 115.22, y: -8.8},//bali
				{x: -95.4, y: 29.78},//houston
				{x: 101.7, y: 3.13},//kl
				{x: 103.82, y: 1.35},//sigapore
				{x: 104.05, y: 30.58},//chendu
				{x: 110.48, y: 29.12},//zhangjiajie
				{x: 126.55, y: 45.6},//haerbin
				{x: 3.88, y: 43.6}, //monpelier
			];
			for (var i = points.length - 1; i >= 0; i--) {
				var marker = new BMap.Marker(new BMap.Point(points[i].x, points[i].y));  
				map.addOverlay(marker);              
			};

		}, 50);

		setTimeout(function(){
			jQuery('#footprintcamera').camera({
		 			time: 1000,
		 			transPeriod: 1000,
		 			height: '430px',
		 		});
		}, 50);
	}
});