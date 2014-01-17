var debugMode = false;
var result, data, songList, songTemplate = [];
result = JSON.parse(localStorage.result);
localStorage.clear();
localStorage.result = JSON.stringify(result);
var sample_url = "https://docs.google.com/spreadsheet/pub?key=0AvLPi2sP07zXdG5rbWRlQkdjR2E1UWdoZjl6Y2Q2R0E&output=html";
//"https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdHF2bWNjcTJFLXJ6UUM5SldEakdEaXc&hl=en&output=html";
var url_parameter = document.location.search.split(/\?url=/)[1];
var url = url_parameter || sample_url;
var googleSpreadsheet = new GoogleSpreadsheet();
var numColumns = 10;
googleSpreadsheet.url(url);
if (debugMode === true) {
	dataCallback();
} else {
    googleSpreadsheet.load(function(a) {
        result = a;
        dataCallback();
    }, function(){
        alert('err');
    });
}

function dataCallback() {
	var i, j;
    data = result.data; //grab the 1D array of things in the spreadsheet
	songList = {}; //create a song list object
	
	//make a "song template" so we know what order to print the stuff later on
	for (i = 0; i < numColumns; i++) {
		// songTemplate.push(data.headers[i]);
	}
	
	for(i=0; i<data.rows.length; i+=1) {
		var currSong = {}; //temporary song object, so we can build it
		for (j = 0; j < data.headers.length; j++) { //loop over every song property
			currSong[data.headers[j]] = data.rows[i][j]; //set the properties (title, artist, etc) for the temporary song
		}

		songList[data.rows[i][0]] = currSong; //put the song in the song list, with its title as the key
	}
	console.log(songList);
	var songListElem = $('#songList');

	$.each(songList, function(songName, obj){
		//create an li element for the song
		var songElem = $('<li class="song-list-item"><span class="song-name">'+songName+'</span><span class="song-bytext"> by </span><span class="artist">'+obj['artist']+'</span></li>');
		var songInfoElem = $('#songInfo');
		//get rid of nonexistant artist names
		if (obj['artist'] === '') {
			songElem.find('.song-bytext, .artist').hide();
		}
		//add songs to the list
		songListElem.append(songElem);
		//when songs are clicked, copy their info into the content box
		songElem.click(function(){
			songInfoElem.empty();
			//spit the song attributes out in order
			for (var i = 0; i < data.headers.length; i++) {
				var key = data.headers[i];
				var value = obj[key];
				if (value === '' || value === undefined) continue; //skip empty categories
				// value = value.replace('&#8629;','\n');
				songInfoElem.append('<div class='+key+'>'+value+'</div>');
				
			}
		});
	});


}