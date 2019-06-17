//////////////////////////////////
/////// Opening arguments, ///////
///////    requirements    ///////
//////////////////////////////////

require("dotenv").config();
var keys = require('./keys.js');
var userCmd = process.argv[2];
var userVal = process.argv.slice(3).join(" ");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require('axios');

var moment = require('moment');
moment().format();

////////////////////////////
/////// concert-this ///////
////////////////////////////

var getConcert = function (input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (response) {
            // console.log(response);
            for (i = 0 ; i < response.data.length ; i++) {
                console.log("");
                concert = response.data[i];
                var qregion = '';
                if(concert.venue.region != '') {
                    qregion = concert.venue.region + ', ';
                }
                console.log('Date & Time: ' + concert.datetime);
                console.log('Location: ' + concert.venue.name + ", " + concert.venue.city + ", " + qregion + concert.venue.country);
            };
        })
        .catch(function (error) {
            console.log(error);
        });
};

/////////////////////////////////
/////// spotify-this-song ///////
/////////////////////////////////

var getSong = function (input) {
    if (input === '') {
        var randomSongs = ['I Want it That Way', 'The Sign', 'So Long, and Thanks for All the Fish'];
        input = randomSongs[Math.floor(Math.random()*randomSongs.length)];
    }
    spotify.search({
            type: "track",
            query: input
        },
        function (err, data) {
            if (err) {
                console.log(err);
                return;
            };

            var results = data.tracks.items;

            for (i = 0; i < 5; i++) {
                console.log('Title: ' + results[i].name);
                var artistArr = []
                for (j = 0 ; j < results[i].artists.length ; j++) {
                    artistArr.push(results[i].artists[j].name);
                }
                console.log('Artist(s): ' + artistArr.join("; "));
                console.log('Album: ' + results[i].album.name);
                console.log('Song preview: ' + results[i].preview_url);
                console.log('Full song (requires Spotify account): ' + results[i].external_urls.spotify);
                console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            };
        });
};


/////////////////////////////////
/////// Retrieve Command ////////
/////////////////////////////////
var getCmd = function () {
    switch (userCmd) {
        case 'spotify-this-song':
            getSong(userVal);
            break;
        case 'concert-this':
            getConcert(userVal);
            break;
        case 'movie-this':
            getMovie(userVal);
            break;
        default:
            console.log('Make sure you are entering a valid command.');
            break;
    };
};

getCmd();