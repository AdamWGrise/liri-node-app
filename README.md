# LIRI Node.js Application
This is my first application using Node.js - a LIRI bot!

## What is this thing?
The LIRI (Language Interpretation and Recognition Interface) bot is a tool used for quickly gathering media information. Specifically, this LIRI is connected to three resources:

1. Spotify. This is used to quickly find results from the Spotify service related to a specific song title, including different artists who have the song with that or a similar title, the album it was on, and a link to a preview.

2. Bands In Town. If you designate a band or musician you are interested in seeing, this resource will tell you all the known dates of upcoming performances.

3. Online Movie Database (OMDb). With this, you can search for a movie title and get some basic information about a film.

## How's it actually work?
There are several JSON packages used throughout this application:
* Axios. This is used to retrieve data from Bands In Town as well as OMDb.
* BandsInTown. Used to get the concert data.
* DotEnv. Used to ensure the app only runs properly from the host server.
* FS (file server). Used to reference other files within the repository. Specifically, when the command to execute a random function is used. Also, used for keeping track of inputs in a log.txt file.
* Moment. Assists with returning the BandsInTown concerts with specifically-formatted dates.
* Spotify & Spotify API. For gathering song data.

This LIRI is a command-line interface (CLI), meaning it can be run through just about any terminal-type application, like Git Bash, Command Prompt, Terminal for iOS, and even PowerShell for Windows. The other requirement is Node, as this program is written in Node.js. The application can be loaded using your terminal and Node, and a command and value can be specified to get data!

## Alright, so how do I actually do _that_?
Well, you won't be able to with this application, since it's designed to be run server-side and won't actually do anything without some required files. Ultimately, this would be available through another interface, but it's in a proof-of-concept state at the moment. Theoretically, it's quite simple:

1. Use your terminal to navigate to where the application is installed (i.e., where all these files from the repository are saved on your computer).

2. To run it, you need to type in four components to your command line, separated by spaces:

   a) The word `node` (to call Node.js to run it).

   b) The name of the main JavaScript file with the LIRI bot in it. In this case, `liri.js`.

   c) A command to pick which resource you want to run:
     * `spotify-this-song` (to search for songs)
     * `concert-this` (to search for concerts)
     * `movie-this` (to search for movies)

   d) The name of the media (song, band, or movie) that you want to find. You don't need quotes or anything - the application will tie all the words together.

3. That's it! Just hit Enter and see what happens. Here are four examples:

```js
    node liri.js spotify-this-song From Out of Nowhere
```
```js
    node liri.js concert-this Evanescence
```
```js
    node liri.js movie-this Hackers
```
```js
    node liri.js do-what-it-says
```

That last one is to get some wild card results using the `random.txt` file.

## Got a demo I can see since I can't do it?

Sure! I've got a video on YouTube!

[![LIRI Demo](http://img.youtube.com/vi/kKP7PdjxdJY/0.jpg)](http://www.youtube.com/watch?v=kKP7PdjxdJY "LIRI Demo")
