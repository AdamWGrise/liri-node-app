require("dotenv").config();

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var userCmd = process.argv[2];
var userVal = process.argv[3];

var getSpotify = function (input) {
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
                console.log('Name: ' + results[i].name);
                console.log('Artists: ' + results[i].artists[0].name);
                console.log('Link: ' + results[i].external_urls.spotify);
                console.log('Album: ' + results[i].album.name);
                console.log('=-=-=-=-=-=-=-=-=-=-=-=');
            };
        });
};

getSpotify(userVal);