var result, data, songList, songTemplate = [];
var infoMinHeight = 140;

result = JSON.parse(localStorage.result); //back up our local copy
localStorage.clear(); //I'm guessing this is necessary for the lib...?
localStorage.result = JSON.stringify(result); //restore our local copy
var sample_url = "https://docs.google.com/spreadsheet/pub?key=0AvLPi2sP07zXdG5rbWRlQkdjR2E1UWdoZjl6Y2Q2R0E&output=html";
//"https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdHF2bWNjcTJFLXJ6UUM5SldEakdEaXc&hl=en&output=html";
var url_parameter = document.location.search.split(/\?url=/)[1];
var url = url_parameter || sample_url;
var googleSpreadsheet = new GoogleSpreadsheet();
googleSpreadsheet.url(url);
googleSpreadsheet.load(function(allegedResult) {
    if (allegedResult !== null) {
        result = allegedResult;
        localStorage.result = JSON.stringify(result);
    }
    dataCallback();
});


function dataCallback() {
	console.log(result);
    var i, j;
    data = result.data; //grab the 1D array of things in the spreadsheet
	songList = {}; //create a song list object
	
	for(i=0; i<data.rows.length; i+=1) {
		var currSong = {}; //temporary song object, so we can build it
		for (j = 0; j < data.headers.length; j++) { //loop over every song property
			currSong[data.headers[j]] = data.rows[i][j]; //set the properties (title, artist, etc) for the temporary song
		}

		songList[data.rows[i][0]] = currSong; //put the song in the song list, with its title as the key
	}
	console.log(songList);
	var songListElem = $('#songList ul').css({'top':infoMinHeight+'px'});

	$.each(songList, function(songName, obj){
		//create an li element for the song
		var songElem = $('<li class="song-list-item"><span class="song-name">'+songName+'</span><span class="song-bytext"> by </span><span class="song-artist">'+obj['artist']+'</span></li>');
		var songDisplayElem = $('#songDisplay');
		//get rid of nonexistant artist names
		if (obj['artist'] === '') {
			songElem.find('.song-bytext, .artist').hide();
		}
		//add songs to the list
		songListElem.append(songElem);
		//when songs are clicked, copy their info into the content box
		songElem.click(function(){
			var songHeadingElem = $('<div class="song-heading"></div>');
            var songInfoElem = $('<div class="song-info"></div>');
			songDisplayElem.empty().append(songHeadingElem);
            $('.song-info').remove();
            $('.song-list').prepend(songInfoElem);
            //spit the song attributes out in order
			for (var i = 0; i < data.headers.length; i++) {
				var key = data.headers[i];
				var value = obj[key];
				if (value === '' || value === undefined) continue; //skip empty categories
				// value = value.replace('&#8629;','\n');
				songInfoElem.append('<div class='+key+'>'+value+'</div>');
			}
            $('.artist, .title').appendTo(songHeadingElem);
            $('.lyrics').appendTo(songDisplayElem);
            //reposition the top of the list
            var infoHeight = songInfoElem.height();
            if (infoHeight < infoMinHeight) infoHeight = infoMinHeight;
            console.log(infoHeight);
            songListElem.css({'top':infoHeight+'px'});
            
		});
	});


}