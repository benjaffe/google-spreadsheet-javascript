var rows, headers;
//google spreadsheet stuff
var sample_url = "https://docs.google.com/spreadsheet/pub?key=0AvLPi2sP07zXdG5rbWRlQkdjR2E1UWdoZjl6Y2Q2R0E&output=html";
var url_parameter = document.location.search.split(/\?url=/)[1];
var url = url_parameter || sample_url;
var googleSpreadsheet = new GoogleSpreadsheet();
googleSpreadsheet.url(url);
// console.log(url);
googleSpreadsheet.load(function(result) {
	// console.log(result);
	if (result !== null) { //if successful:
		var songList = [];
		headers = result.data.headers;
		rows = result.data.rows;
		//format data - loop over every row (ie. song)
		for (var i = 0; i < rows.length; i++) {
			var song = rows[i]; //pointer to song array
			var songObj = {}; //new song object
			//loop over every property of the song
			for (var j = 0; j < headers.length; j++) {
				songObj[headers[j]] = song[j]; //set the property in the song object
			}
			var title = songObj.title; //get the title of the song
			songList.push(songObj); //add the song to the song list
		}
		window.scopePointer.songs = songList; //put data in angularjs
		window.scopePointer.$apply(); //tell angularjs to refresh
		localStorage.songs = JSON.stringify(songList);
		console.log('loaded');
		if (JSON.stringify(window.blah) !== JSON.stringify(songList))
			console.log('data updated from Google Spreadsheet');
		// console.log(songList);
	}
});