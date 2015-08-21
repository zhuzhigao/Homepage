var app = angular.module('homeApp', ['ngRoute', 'ngSanitize']);
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


app.controller('homeCtrl', ['$scope','$http', function($scope, $http) {
	$scope.imagesource = [
	{"datathumb": "./images/slides/thumbs/1.jpg", "datasrc": "./images/slides/1.jpg"}, 
	{"datathumb": "./images/slides/thumbs/2.jpg", "datasrc": "./images/slides/2.jpg"}, 
	{"datathumb": "./images/slides/thumbs/3.jpg", "datasrc": "./images/slides/3.jpg"}, 
	{"datathumb": "./images/slides/thumbs/4.jpg", "datasrc": "./images/slides/4.jpg"}, 
	{"datathumb": "./images/slides/thumbs/5.jpg", "datasrc": "./images/slides/5.jpg"}, 
	{"datathumb": "./images/slides/thumbs/6.jpg", "datasrc": "./images/slides/6.jpg"}		];
	
	$scope.templateUrl = "./pages/intro.html";
	$scope.weather ={city: "Beijing", weather: "", degree: 0, windspeed: 3, icon:""};
	
	//this must be called to enable the slider. 
	//the time delay is necessary to make sure the element is in place. 
	$scope.onsliderload = function() {
		setTimeout(function(){
			jQuery('#camera_wrap_1').camera({
				time: 1000,
				transPeriod: 1000,
				height: '650px',
			});
		}, 50);
	};

	$scope.init = function()
	{
		$http.get('http://api.openweathermap.org/data/2.5/find?q=Beijing&units=metric').
  			then(function(response) {
  				$scope.weather.weather = response.data.list[0].weather[0].main;
  				$scope.weather.degree = response.data.list[0].main.temp;
  				$scope.weather.windspeed = response.data.list[0].wind.speed;
  				$scope.weather.icon = 'http://openweathermap.org/img/w/' + response.data.list[0].weather[0].icon + '.png';
  			}, function(response) {
  				//do nothing if failed to get the weather.
			});
	}
	$scope.init();
}])
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

	$scope.placevisited=[
	{	location: "Lankawei", 
	coords:{x: 99.67, y: 6.35}, 
	images:["./images/lankawi/1.jpg", "./images/lankawi/2.jpg", "./images/lankawi/3.jpg", "./images/lankawi/4.jpg", "./images/lankawi/5.jpg"],
	description: "<p>8 days trip to Lankawei Island in Oct, 2013. Dou Dou was around 5 years old at that time.</p> <p>I clearly remember that DouDou called the shuttle bus with his lovely voice: shuttle please, and several days later even the reception knew him and would like to play with him.</p> <p>We rent a car during this trip, no surprise, a small accident.:-)</p> <p>We also visited K.L for two days. In the twin tower, we even caught a fire drill.</p>"
	},
	{	location: "Bali", 
	coords:{x: 115.22, y: -8.8}, 
	images:["./images/bali/1.jpg", "./images/bali/2.jpg", "./images/bali/3.jpg", "./images/bali/4.jpg", "./images/bali/5.jpg"],
	description: "<p>8 days trip to Bali Island in Apr, 2012. Doudou's first international trip.</p> <p>We really enjoyed the sunshine and breach there. Especially in Nusa Dua, just spent the time on beach and in swimming pool, beautiful leasure time. Doudou was so scared the first time he entered the swimming pool, but later just couldn't stop him.</p> <p>The Fa Lun Gong there was also very impressive - they even have a band. -__-!!</p>"
	},
	{	location: "Bashang", 
	coords:{x: 116, y: 41.58}, 
	images:["./images/bashang/1.jpg", "./images/bashang/2.jpg", "./images/bashang/3.jpg", "./images/bashang/4.jpg", "./images/bashang/5.jpg"],
	description: "<p>The trip to prairie in 2013, with high expectation and high dispointment.</p><p>The thing impressed me was not the grass, not the horse, not the broadness land, but the time spent on the way - 7 hours driving from Beijing to there, and 8 hours driving back. I did want to replace the car with a more powerful one - it was so slow after fully loaded..</p>"
	},
	{	location: "HongKong", 
	coords:{x: 114.16, y: 22.3}, 
	images:["./images/hongkong/1.jpg", "./images/hongkong/2.jpg", "./images/hongkong/3.jpg", "./images/hongkong/4.jpg", "./images/hongkong/5.jpg"],
	description: "<p>4 days trip in Hongkong in 2014.</p> <p>The city is not as good as I imgined. Small and crowded. But the Disney Land was great, even there were so many people. Deeply impressed by the musical opera, the playground was also outstanding. We waited till 8:30PM for the fireworks, but it turned out to be another highlight.</p></p>The Sea World was also attractive, but seemed not to Dou Dou. Diamond cable car was another must-try thing, if you're not scared of the height.<p>"
	},
	{	location: "Jiuzaigou", 
	coords:{x: 104.2, y: 33.3}, 
	images:["./images/jiuzai/1.jpg", "./images/jiuzai/2.jpg", "./images/jiuzai/3.jpg", "./images/jiuzai/4.jpg", "./images/jiuzai/5.jpg"],
	description: "<p>Jiuzaigou trip in year 2006, the first long distance trip after marriage.</p><p>After two days in Chengdu, we took 10 hours bus to Jiu Zai Tou. Pretty dangerious and tough trip, but it deserved - we saw a lot of autumn scenes on the way .</p> <p>End of september is really the best season, the red trees mirrored in the amazing water make it like a heaven.</p><p>In Huanglong, we caught the first snow of that year - from autumn to winter in just one night.</p>"
	},
	{	location: "Taishan", 
	coords:{x: 117.1, y: 37.25}, 
	images:["./images/taishan/1.jpg", "./images/taishan/2.jpg", "./images/taishan/3.jpg", "./images/taishan/4.jpg", "./images/taishan/5.jpg"],
	description: "<p>Taishan trip around 2003. A classic place of must be there once, but never the second time.</p> <p>Pretty tired climbing - yes, we'd like to save the money for cable car:-). We didn't see great views on the way, neither caught the sun rise. To people who are not interested in culture very much like us, it was a boring trip.</p>"
	},
	];

	$scope.activePlace = $scope.placevisited[0];

	//this must be called to enable the slider. 
	//the time delay is necessary to make sure the element is in place. 
	$scope.onsliderload = function() {
		setTimeout(function(){
			var map = new BMap.Map("baidumap");  
			map.centerAndZoom(new BMap.Point(0, 20), 3);
			map.addControl(new BMap.MapTypeControl());
			map.setCurrentCity("北京");          
			map.enableScrollWheelZoom(true);
			// var points = [
			// 	{x: 99.67, y: 6.35},//lankawi
			// 	{x: 115.22, y: -8.8},//bali
			// 	{x: -95.4, y: 29.78},//houston
			// 	{x: 101.7, y: 3.13},//kl
			// 	{x: 103.82, y: 1.35},//sigapore
			// 	{x: 104.05, y: 30.58},//chendu
			// 	{x: 110.48, y: 29.12},//zhangjiajie
			// 	{x: 126.55, y: 45.6},//haerbin
			// 	{x: 3.88, y: 43.6}, //monpelier
			//		{x: 116.0, y:  41.58}, //bashang 
			//		{x:114.16 , y:22.3 }, //hongkong
			// 	];
			for (var i = $scope.placevisited.length - 1; i >= 0; i--) {
				var marker = new BMap.Marker(new BMap.Point($scope.placevisited[i].coords.x, $scope.placevisited[i].coords.y));
				marker.location = $scope.placevisited[i].location;
				marker.addEventListener("click", $scope.markerclicked);
				map.addOverlay(marker);              
			};
		}, 50);
		$scope.updatecamera();
	};

	$scope.markerclicked = function(e){
		$(".camera_wrap").cameraStop();
		var marker = e.target;
		$scope.description = marker.location;
		$scope.activePlace = $.grep($scope.placevisited, function(e){ return e.location == marker.location; })[0];

		$scope.$apply();

		$scope.updatecamera();
		
	};

	$scope.updatecamera=function(){
		$(".camera_wrap").empty();
		$.each($scope.activePlace.images, function (idx, val){
			var slide = "<div data-thumb=\"" + val + "\"" + "data-src=\"" + val +"\">";
			slide = slide +  "<div class=\"camera_caption fadefrombottom\">";
			slide = slide + "see how cool the family is!";
			slide = slide + "</div>"
			$(".camera_wrap").append(slide);
		});

		$('#footprintcamera').camera({
			time: 1000,
			transPeriod: 1000,
			height: '430px',
		});
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
	{"name": "Zhigao's father, smart and hard work, raised the family with his small body.", 
	"shape": "rect", 
	"coords": "209, 59, 309, 166"},
	{"name": "Zhigao's mother, almost illiterate, very smart in learning everything, yet a little sensitive.", 
	"shape": "rect", 
	"coords": "360, 59, 460, 166"},
	{"name": "Aiqin's father, former tractor driver, very silent and reliable person.", 
	"shape": "rect", 
	"coords": "514, 59, 614, 166"},
	{"name": "Aiqin's mother, almost illiterate but is strong minded and hard working.", 
	"shape": "rect", 
	"coords": "666, 59, 766, 166"},
	{"name": "Zhigao's brother in law, professional driver and nice guy.", 
	"shape": "rect", 
	"coords": "53, 214, 158, 328"},
	{"name": "Zhigao's sister, an ordinary worker at the hometown, very kind-hearted, live close to the parents.",
	"shape": "rect",
	"coords": "205, 214, 312, 328"},
	{"name": "Zhigao, the host.",
	"shape": "rect",
	"coords": "357, 214, 463, 328"},
	{"name": "Aiqin, the hostress.",
	"shape": "rect",
	"coords": "511, 214, 617, 328"},
	{"name": "Aiqin's sister, a doctor at her hometown, live close to the parents.",
	"shape": "rect",
	"coords": "663, 214, 769, 328"},
	{"name": "Aiqin's brother in law, registered accountant at the hometown.",
	"shape": "rect",
	"coords": "815, 214, 920, 328"},
	{"name": "Zhigao's nephew, will have the university entrance exam next year - fully believe he is going to join a great university.",
	"shape": "rect",
	"coords": "131, 364, 231, 473"},
	{"name": "Doudou, my lovely son, going to be grade 2 primary school student.",
	"shape": "rect",
	"coords": "437, 365, 536, 473"},
	{"name": "aiqin's nephew, going to be grade 5 primary school student, good at Chinese Calligraphy.",
	"shape": "rect",
	"coords": "743, 364, 843, 473"},
	];

	$scope.personintro = "This family tree shows where we're from. Click the picture of each person to know more about him/her. ";

	$scope.personclick = function (person, $event) {
		$scope.personintro = person.name;
		$event.stopPropagation();
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
