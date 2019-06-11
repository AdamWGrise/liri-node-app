# LIRI Node App
My first project using Node.js - a LIRI bot!

Apple's SIRI stands for "speech interpretation and recognition interface." A LIRI, similiarly, is a "language interpretation and recognition interace." This LIRI bot is my first attempt at using Node.js to write a program.

## Objectives
[ ] Leverage axios appropriately for OMDB, Spotify, and Bands In Town
   * [Axios](https://www.npmjs.com/package/axios)
[ ] Search Spotify for songs
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
[ ] Search Bands in Town for concerts
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
[ ] Search OMDB for movies
   * [OMDB API](http://www.omdbapi.com)
[ ] Leverage Moment as needed
   * [Moment](https://www.npmjs.com/package/moment)
[ ] Leverage DotEnv as needed
   * [DotEnv](https://www.npmjs.com/package/dotenv)


## Submission
Note: Cannot be submitted to GitHub Pages or Heroku, as this is a CLI app.
[ ] Supply screenshots, GIF, or video demonstrating use of the app with no bugs.
[ ] Submit on GitHub as usual.
[ ] Include links in this or a separate `README.md` file, which should also include:
1. Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
2. Give a high-level overview of how the app is organized
3. Give start-to-finish instructions on how to run the app
4. Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app
6. Clearly list the technologies used in the app
7. State your role in the app development
[ ] The README must be thorough and well-written, as it's part of the grading for this particular assignment.
* [Click here for an example rundown](https://guides.github.com/features/mastering-markdown/)

## Instructions Reminders
1. From the repo root, run `npm init -y` to quickly create the needed `package.json` file.
2. Make a `.gitignore` file and add these lines:
```
node_modules
.DS_Store
.env
```
3. Make a JS file called `keys.js` and add this code:
```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```
4. Make a file called `.env` and add this code with your own API keys:
```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
###### Important learning point
Spotify uses OAuth 2.0 for user authentication, but it's not an authentication protocol itself. Rather, it's an ingredient of authentication protocols - although it doesn't have to be, but it is in the case of Spotify.

5. Add a file called `random.txt` and stick one line in it:
   * spotify-this-song,"I Want it That Way"

6. Make a JS file: `liri.js`.

7. Add this code to read and set environment variables with the dotenv package:
```js
require("dotenv").config();
```

8. Import the `keys.js` components and store in a variable:
```js
  var keys = require("./keys.js");
```

9. A new variable will be able to access the keys information:
  ```js
  var spotify = new Spotify(keys.spotify);
  ```

10. Install the Spotify API package:
   * [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api)

11. Install dotenv by running this in a terminal/Bash:
```
npm install --dotenv-extended
```