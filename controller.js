var app = angular.module('angularjs-starter', ['angular.directives-round-progress']);

app.controller('MainCtrl', function($scope, $interval) {
	$scope.running = false;
	$scope.timesUp = false;
	$scope.initValue = 25;
	$scope.currentValue = $scope.initValue;
	$scope.currentCounter = null;
	$scope.delay = 1000*60;	// Minutes
	// $scope.delay = 1000;		// Seconds
	
	$scope.playSound = function() { 
		var audio = document.getElementById("timesUpSound");
		audio.load();
		audio.play();
	} 
	
	var setProgress = function(label, percentage) {
		$scope.roundProgressData = {
			label: label,
			percentage: percentage
		};
	};

	var startCounter = function(delay) {
		$scope.running = true;
		$scope.timesUp = false;
		$scope.currentValue = $scope.initValue;
		$scope.currentCounter = $interval(updateCounter, delay);
		setProgress($scope.initValue, 1);
	};

	var updateCounter = function() {
		if($scope.currentValue > 0) {
			$scope.currentValue--;
			setProgress(Math.ceil($scope.currentValue), ((100 / $scope.initValue) * $scope.currentValue) / 100);
		} else {
			//$scope.stop();
			$scope.playSound();
			$scope.timesUp = true;
			$scope.running = false;
			$interval.cancel($scope.currentCounter);
		}
	};

	setProgress($scope.initValue, 1);

	$scope.$watch('initValue', function (newValue) {
		if(!$scope.running) {
			setProgress(newValue, 1);
		}
	}, true);
	
	$scope.start = function(){
		if(!$scope.running) {
			startCounter($scope.delay);
		}
	};

	$scope.stop = function(){
		$scope.running = false;
		$scope.currentValue = $scope.initValue;
		setProgress($scope.initValue, 1);
		if (angular.isDefined($scope.currentCounter)) {
			$interval.cancel($scope.currentCounter);
			$scope.currentCounter = undefined;
		}
	};

	$scope.stop();
});
