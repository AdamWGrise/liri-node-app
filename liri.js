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
var fs = require('fs');

////////////////////////////
/////// concert-this ///////
////////////////////////////

var getConcert = function (input) {
    if (input === '') {
        input = 'New Kids on the Block';
        userVal = 'New Kids on the Block';
    };
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (response) {
            if (response.data.length === 0) {
                console.log("No upcoming concerts for " + input + ". Bummer, dude.");
            } else {
                console.log("\nUpcoming concerts for " + response.data[0].lineup[0] + "...\n");
                fs.appendFile('log.txt', '\n\n=== Upcoming concerts for ' + response.data[0].lineup[0] + '... ===', function () {});
                for (i = 0; i < response.data.length; i++) {
                    concert = response.data[i];
                    var qregion = '';
                    if (concert.venue.region != '') {
                        qregion = concert.venue.region + ', ';
                    }
                    console.log('Date: ' + moment(concert.datetime).format('MM/DD/YYYY'));
                    console.log('Location: ' + concert.venue.name + ", " + concert.venue.city + ", " + qregion + concert.venue.country + "\n");

                    var logText = '\n\nDate: ' + moment(concert.datetime).format('MM/DD/YYYY') + '\nLocation: ' + concert.venue.name + ", " + concert.venue.city + ", " + qregion + concert.venue.country;
                    fs.appendFile('log.txt', logText, function () {});
                };
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
        var randomSongs = ['Africa', 'The Sign', 'So Long, and Thanks for All the Fish'];
        input = randomSongs[Math.floor(Math.random() * randomSongs.length)];
        userVal = input;
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
                for (j = 0; j < results[i].artists.length; j++) {
                    artistArr.push(results[i].artists[j].name);
                }
                console.log('Artist(s): ' + artistArr.join("; "));
                console.log('Album: ' + results[i].album.name);
                console.log('Song preview: ' + results[i].preview_url);
                console.log('Full song (requires Spotify account): ' + results[i].external_urls.spotify);
                console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');

            };

            var logText = '\n\n=== First result from Spotify: ===\nTitle: ' + results[0].name + '\nArtist: ' + results[0].artists[0].name + '\nAlbum: ' + results[0].album.name + '\nSong preview: ' + results[0].preview_url
            fs.appendFile('log.txt', logText, function () {
                if (err) {
                    console.log(err);
                }
            });

        });
};

//////////////////////////
/////// movie-this ///////
//////////////////////////

var getMovie = function (input) {
    var noInput = false;
    if (input === '') {
        input = 'Mr. Nobody';
        userVal = 'Mr. Nobody';
        noInput = true;
    };
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
        .then(function (response) {
            var movie = response.data;
            console.log('\n' + movie.Title + ' (' + movie.Year + ')');
            console.log('Starring ' + movie.Actors);
            console.log('Rated ' + movie.Rated);
            console.log('Rotten Tomatoes rating: ' + movie.Ratings[1].Value);
            console.log('Produced in ' + movie.Country);
            console.log('Language(s): ' + movie.Language);
            console.log('Plot: ' + movie.Plot);
            if (noInput) {
                console.log("\nIf you haven't watched Mr. Nobody, you should! It's on Netflix.");
            };
            var logText = '\n\n' + movie.Title + ' (' + movie.Year + ')\nStarring ' + movie.Actors + '\nRated ' + movie.Rated + '\nRotten Tomatoes rating: ' + movie.Ratings[1].Value + '\nProduced in ' + movie.Country + '\nLanguage(s): ' + movie.Language + '\nPlot: ' + movie.Plot;
            fs.appendFile('log.txt', logText, function () {});
        })
        .catch(function (error) {
            console.log(error);
        });

};

///////////////////////////////
/////// do-what-it-says ///////
///////////////////////////////

var getRandom = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };
        var dataArr = data.split(",");
        getSet = Math.floor(Math.random() * dataArr.length / 2);
        userCmd = dataArr[getSet * 2];
        userVal = dataArr[getSet * 2 + 1];
        doRandom = true;
        getCmd();
    });
};

/////////////////////////////////
/////// Retrieve Command ////////
/////////////////////////////////

var doRandom = false;
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
        case 'do-what-it-says':
            getRandom();
            break;
        default:
            console.log('Make sure you are entering a valid command.');
            break;
    };

    if (userCmd != 'do-what-it-says' && doRandom === false) {
        var logText = '\n\n\n====================================================\n' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n' + userCmd + " ; " + userVal;
        fs.appendFile("log.txt", logText, function (err) {
            if (err) {
                console.log(err);
            }
        });
    } else if (doRandom === true) {
        var logText = '\n\n\n====================================================\n' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\ndo-what-it-says ; ' + userCmd + " ; " + userVal;
        fs.appendFile("log.txt", logText, function (err) {
            if (err) {
                console.log(err);
            }
        });
        doRandom = false;
    };
};

getCmd();