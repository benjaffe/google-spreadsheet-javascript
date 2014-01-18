var songtrackerApp = angular.module('songtrackerApp', []);

songtrackerApp.controller('SongListCtrl', function ($scope) {
	window.scopePointer = $scope;
	
	$scope.songs = [];

	$scope.currentSongIndex = 0;
	$scope.orderBy = 'title';
	$scope.focusInput = true;
	
	$scope.showSong = function() {
		$scope.currentSongIndex = this.$index;
		$scope.currentSong = this.song;
		console.log(this);
		console.log($scope.currentSongIndex);
	};

	$scope.handleKeyPress = function(ev) {
		$scope.pressed = ev.which;
		console.log(ev.which);
		if (ev.which === 40) {num=1;}//down
		else if (ev.which === 38) {num=-1;}//up
		else if ((ev.which >= 64 && ev.which <= 90) || ev.which === 9) {
			$scope.focusInput = true;
			return false;
		}
		else {return false;}

		console.log($scope);
		$scope.currentSongIndex += num;
		var last_item = $scope.songs.length - 1;
		if ($scope.currentSongIndex > last_item){
			$scope.currentSongIndex = 0;
		} else if ($scope.currentSongIndex < 0) {
			$scope.currentSongIndex = last_item;
		}
	};
});

songtrackerApp.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) {
            element[0].focus();
            scope[attrs.focusMe] = false;
        }
      });
    }
  };
});