/////////////////////////////////
/////// Opening Arguments ///////
/////////////////////////////////

require("dotenv").config();
var keys = require('./keys.js');
var userCmd = process.argv[2];
var userVal = process.argv.slice(3).join(" ");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var bandsintown = require('bandsintown') /*(APP_ID)*/ ;

var getConcert = function (input) {
    bandsintown
        .getArtistEventList(input)
        .then(function (events) {
            console.log(events)
        });
};


/////////////////////////////////
/////// spotify-this-song ///////
/////////////////////////////////
var getSong = function (input) {
    if (input === undefined) {
        input = "I Want it That Way";
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

            console.log(results[0]);

            for (i = 0; i < 20; i++) {
                console.log('Song name: ' + results[i].name);
                console.log('Artist: ' + results[i].artists[0].name);
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