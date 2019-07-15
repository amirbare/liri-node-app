require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);


var moment = require('moment');
var axios = require('axios');
var fs = require('fs');

var argument = process.argv[2];
var moviename = process.argv[3];


if(argument === "movie-this")
{

    movieThis();

}


if(argument === "spotify-this-song")
{

    spotifyThisSong();

}

if(argument === "concert-this")
{

    concertThis();

}

if(argument === "do-what-it-says")
{

    doWhatItSays();
}



function movieThis() {

    // moviename = "tron";
    if(moviename == " ")
    {

        moviename ="Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
      
      
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

          console.log("Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("Rated: " + response.data.Rated);
          console.log("Actors: " + response.data.Actors);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.rottenTomatoesRating);  
          console.log("Country/Countries Filmed: " + response.data.Country);
          console.log("Language(s): " + response.data.Language);
          console.log("Plot: " + response.data.Plot);

          var toText = response.data.Title + "," + response.data.Year + "," + response.data.Rated
          + "," + response.data.Actors + "," + response.data.Language  + "," + response.data.Plot ;

          fs.appendFile('log.txt', toText, function (err) {
            if (err) {
                console.log(err);
            }
            else console.log("updated txt file");
        });
      
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}



function spotifyThisSong() {

    if (moviename == " ")
    {

        moviename = "The Sign";

    }

    spotify.search({ type: 'track', query: "'" + moviename + "'", limit: 20}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        // console.log(data.tracks);
        var artist = "Artist: " + data.tracks.items[0].artists[0].name;
        var songName = "Title: " + data.tracks.items[0].name;
        var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;
        var albumName = "Album Name: " + data.tracks.items[0].album.name;
        console.log(artist);
        console.log(songName);
        console.log(previewLink);
        console.log(albumName);
    //   console.log(data.tracks); 
      });

}



function concertThis() {
      
    var getUrl = "https://rest.bandsintown.com/artists/" + moviename + "/events?app_id=codingbootcamp";
    axios.get(getUrl).then(
        function (response, err) {
            if (response) {
                // console.log(response.data);
                var infoName = response.data[0];
                var venueName = "Venue Name: " + infoName.venue.name;
                var venueLocation = "Venue Location: " + infoName.venue.city;
                var playTime = infoName.datetime;
                var newTime = playTime.split('T');
                var venueDate = "Venue Date: " + moment(newTime[0]).format("MM/DD/YYYY");
                console.log(newTime);

                console.log(venueName);
                console.log(venueLocation);
                console.log(venueDate);
        
            }else{                
                console.log(err);
            }
        }); 
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
			return console.log("error." + error);
		}else{

		var dataArr = data.split(",");
		action = dataArr[0];
        songTitle = dataArr[1];
        moviename = songTitle;

        // console.log(songTitle);
		spotifyThisSong();
        }
    });
}



