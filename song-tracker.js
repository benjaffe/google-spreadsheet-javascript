function SongListCtrl($scope) {
	$scope.songs = {};
	window.scopePointer = $scope;

	$scope.showSong = function() {
		$scope.currentSong = this.song;
	};

	$scope.currentSong = {};
}