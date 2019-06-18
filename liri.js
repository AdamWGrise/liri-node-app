//////////////////////////////////
/////// Opening arguments, ///////
///////    requirements    ///////
//////////////////////////////////

require("dotenv").config();
var keys = require('./keys.js');
var userCmd = process.argv[2]; // Grabbing the command parameter that was typed in.
var userVal = process.argv.slice(3).join(" "); // Taking basically everything after the userCmd and setting it to the value we're going to search for.

// Other packages:
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

////////////////////////////
/////// concert-this ///////
////////////////////////////

var getConcert = function (input) {
    if (input === '') { // If no band name is specified
        input = 'New Kids on the Block';
        userVal = 'New Kids on the Block'; // Setting userVal for log.txt logging later.
    };
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp&date=upcoming")
        .then(function (response) {
            if (response.data.length === 0) {
                console.log("No upcoming concerts for " + input + ". Bummer, dude."); // If nothing in the response, give a comment to the user.

                fs.appendFile('log.txt', '\nNo upcoming concerts for ' + input + '.\n\n', function () {}); // Same for the log.txt file.

            } else {
                console.log("\nUpcoming concerts for " + response.data[0].lineup[0] + "...\n"); // Console.log 'header' for all the results...

                fs.appendFile('log.txt', '\n\n=== Upcoming concerts for ' + response.data[0].lineup[0] + '... ===', function () {}); // Similar results header for log.txt.

                for (i = 0; i < response.data.length; i++) {
                    concert = response.data[i]; // Shortcut for response.

                    var qregion = '';
                    if (concert.venue.region != '') {
                        qregion = concert.venue.region + ', ';
                    } // Checks if there is a region value, i.e., a U.S. state. This informs the format of the logging.

                    console.log('Date: ' + moment(concert.datetime).format('MM/DD/YYYY')); // Concert date, formatted with Moment.js.

                    console.log('Location: ' + concert.venue.name + ", " + concert.venue.city + ", " + qregion + concert.venue.country + "\n"); // Location for the concert, laid out in one line.

                    var logText = '\n\nDate: ' + moment(concert.datetime).format('MM/DD/YYYY') + '\nLocation: ' + concert.venue.name + ", " + concert.venue.city + ", " + qregion + concert.venue.country; // Defining the concert item to log in the log.txt file...

                    fs.appendFile('log.txt', logText, function () {}); // ...and finally logging it. Included as part of the FOR loop to ensure all results are logged individually.
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
        var randomSongs = ['Africa', 'The Sign', 'So Long, and Thanks for All the Fish']; // Defining some random songs in an array to pick from if no song is specified.

        input = randomSongs[Math.floor(Math.random() * randomSongs.length)]; // Then picking the song from the array.

        userVal = input; // And assigning the song to userVal for log.txt later.
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

            var results = data.tracks.items; // Shortcut to results

            for (i = 0; i < 5; i++) {
                console.log('Title: ' + results[i].name);

                var artistArr = []; // Many songs have multiple artists; just creating an array here to dump them all into.

                for (j = 0; j < results[i].artists.length; j++) {
                    artistArr.push(results[i].artists[j].name);
                }; // Pushing all of the artists for this song into the array.

                console.log('Artist(s): ' + artistArr.join("; ")); // Now stringing that artist array back together...
                console.log('Album: ' + results[i].album.name);
                console.log('Song preview: ' + results[i].preview_url);
                console.log('Full song (requires Spotify account): ' + results[i].external_urls.spotify);
                console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='); // The rest of the stuff getting logged.
            };

            var logText = '\n\n=== First result from Spotify: ===\nTitle: ' + results[0].name + '\nArtist: ' + results[0].artists[0].name + '\nAlbum: ' + results[0].album.name + '\nSong preview: ' + results[0].preview_url; // log.txt value...

            fs.appendFile('log.txt', logText, function () {
                if (err) {
                    console.log(err);
                }
            }); // For spotify, just logging the first result in log.txt.
        });
};

//////////////////////////
/////// movie-this ///////
//////////////////////////

var getMovie = function (input) {
    var noInput = false; // Just a variable to determine if the Mr. Nobody comment should be logged.
    if (input === '') {
        input = 'Mr. Nobody';
        userVal = 'Mr. Nobody'; // Default value, setting userVal for log.txt.
        noInput = true; // Since there was no input, this is set to 'true' to log the Mr. Nobody recommendation.
    };
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
        .then(function (response) {
            var movie = response.data; // Shortcut for responses.

            // Movie response logged out:
            console.log('\n' + movie.Title + ' (' + movie.Year + ')');
            console.log('Starring ' + movie.Actors);
            console.log('Rated ' + movie.Rated);
            console.log('Rotten Tomatoes rating: ' + movie.Ratings[1].Value);
            console.log('Produced in ' + movie.Country);
            console.log('Language(s): ' + movie.Language);
            console.log('Plot: ' + movie.Plot);
            if (noInput) { // Only if noInput is still true from up above...
                console.log("\nIf you haven't watched Mr. Nobody, you should! It's on Netflix.");
            };

            var logText = '\n\n' + movie.Title + ' (' + movie.Year + ')\nStarring ' + movie.Actors + '\nRated ' + movie.Rated + '\nRotten Tomatoes rating: ' + movie.Ratings[1].Value + '\nProduced in ' + movie.Country + '\nLanguage(s): ' + movie.Language + '\nPlot: ' + movie.Plot; // Response for log.txt.

            fs.appendFile('log.txt', logText, function () {}); // ...and logging to log.txt.
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
        var dataArr = data.split(","); // Splitting up all the values in the random.txt file.

        getSet = Math.floor(Math.random() * dataArr.length / 2); // The contents of random.txt are in command-value pairs. This will randomize which command-value pair will be selected.

        userCmd = dataArr[getSet * 2]; // This gets the command for the command-value 'set' that was randomly chosen...

        userVal = dataArr[getSet * 2 + 1]; // ...and this gets the value.

        doRandom = true; // Variable that changes how log.txt gets logged.

        getCmd(); // Now that a new random command-value set was selected, run the core function again.
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
        }); // This logs in a particular format if do-what-it-says wasn't used.

    } else if (doRandom === true) {
        var logText = '\n\n\n====================================================\n' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\ndo-what-it-says ; ' + userCmd + " ; " + userVal;
        fs.appendFile("log.txt", logText, function (err) {
            if (err) {
                console.log(err);
            }
        }); // And this will log in a different format if do-what-it-says was entered.
        doRandom = false; // Resetting the doRandom variable.
    };
};

getCmd(); // Main function.