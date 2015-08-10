var app = angular.module('homeApp', ['ngRoute']);
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/stories', {
			templateUrl: './pages/stories.html',
			controller: 'stroriesCtrl'
		}).
		when('/familytree', {
			templateUrl: './pages/familytree.html',
        	controller: 'familyCtrl'
		}).
		when('/footprint', {
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
	{"datathumb": "./images/slides/thumbs/1.png", "datasrc": "./images/slides/1.png"}, 
	{"datathumb": "./images/slides/thumbs/2.png", "datasrc": "./images/slides/2.png"}, 
	{"datathumb": "./images/slides/thumbs/3.png", "datasrc": "./images/slides/3.png"}, 
	{"datathumb": "./images/slides/thumbs/4.png", "datasrc": "./images/slides/4.png"}, 
	{"datathumb": "./images/slides/thumbs/5.png", "datasrc": "./images/slides/5.png"}, 
	{"datathumb": "./images/slides/thumbs/6.png", "datasrc": "./images/slides/6.png"}		];
	
	$scope.templateUrl = "./pages/intro.html";
	
	//this must be called to enable the slider. 
	//the time delay is necessary to make sure the element is in place. 
	$scope.onsliderload = function() {
		setTimeout(function(){
			jQuery('#camera_wrap_1').camera({
				time: 1000,
				transPeriod: 1000,
				height: '640px',
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
	{"datathumb": "./images/slides/thumbs/1.png", "datasrc": "./images/slides/1.png"}, 
	{"datathumb": "./images/slides/thumbs/2.png", "datasrc": "./images/slides/2.png"}, 
	{"datathumb": "./images/slides/thumbs/3.png", "datasrc": "./images/slides/3.png"}		];
	
	//this must be called to enable the slider. 
	//the time delay is necessary to make sure the element is in place. 
	$scope.onsliderload = function() {
		setTimeout(function(){
			var map = new BMap.Map("baidumap");  
			map.centerAndZoom(new BMap.Point(8, 20), 3);
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

app.controller("stroriesCtrl", function ($scope, $timeout){
})
.directive('timeline', function($timeout) {
	return {link: 
		function(scope, el, attrs) {
			$timeout((function(){
				$('.cntl').cntl();
			}), 50);
		}
	}
});

app.controller("familyCtrl", function ($scope, $timeout){
	$scope.persons = [
		{"name": "zhigao", "shape": "rect", "coords": "0, 0, 200, 200"},
		{"name": "aiqin", "shape": "rect", "coords": "200, 200, 400, 400"},
	];

	$scope.personintro = "person information";

	$scope.personclick = function (person) {
        				$scope.personintro = person.name;
    				}
})
.directive('maphighlight', function($timeout) {
	return {link: 
		function($scope, el, attrs) {
			$timeout((function(){
				$('.familytree').maphilight();
			}), 50);
		}
	}
});
