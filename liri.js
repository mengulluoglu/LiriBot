require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");


//???????? <Doesnt  work
function Concert(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function(response) {
            var location = response.data[0];
            console.log(
                location.venue.city + "," + (location.venue.region || location.venue.country) + " at " + location.venue.name + " " + moment(location.datetime).format("MM/DD/YYYY")
            );
        }
    );
};

//var concert = function(artist) {
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// axios.get(queryURL).then(
// function(response) {
// var jsonData = response.data;

// if (!jsonData.length) {
// console.log("No results found for " + artist);
// return;
// }

// console.log("Upcoming concerts for " + artist + ":");

// for (var i = 0; i < jsonData.length; i++) {
// var location = jsonData[i];
// console.log(
// locationvenue.city + ","  (location.venue.region || location.venue.country) + " at " + location.venue.name + " " +moment(location.datetime).format("MM/DD/YYYY")
// );
// }
// }
// );

// 


function SpotifySong(song) {
    spotify
        .search({ type: 'track', query: song, limit: 20 })
        .then(function(response) {
            console.log('Artist: ' + response.tracks.items[0].album.artists[0].name);
            console.log('Album Name: ' + response.tracks.items[0].album.name);
            console.log('Song Name: ' + response.tracks.items[0].name);
            console.log('Preview Song: ' + response.tracks.items[0].preview_url);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function Movie(movieName) {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=trilogy")
        .then(
            function(response) {

                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
            })
        .catch(
            function(error) {
                if (error.response) {
                    console.log(error.response.data)
                }
            })
};
if (process.argv[2] === "movie-this") {
    var movieNameOf = "";
    if (process.argv[3] === undefined) {
        movieNameOf = 'Mr. Nobody';
    } else {
        movieNameOf = process.argv.slice(3).join(" ");
    };
    Movie(movieNameOf);
} else if (process.argv[2] === "concert-this") {
    var artistNameOf = "";
    artistNameOf = process.argv.slice(3).join(" ");
    Concert(artistNameOf);

} else if (process.argv[2] === "spotify-this-song") {
    var songNameOf = "";
    if (process.argv[3] === undefined) {
        songNameOf = "The Sing";
    } else {
        songNameOf = process.argv.slice(3).join(" ");
    }
    SpotifySong(songNameOf);



} else if (dataArr[0] === "concert-this") {
    Concert(dataArr[1]);
} else if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        if (dataArr[0] === "spotify-this-song") {
            SpotifySong(dataArr[1]);
        } else if (dataArr[0] === "movie-this") {
            Movie(dataArr[1]);

        }

    });
} else {
    console.log("Wrong command");
};