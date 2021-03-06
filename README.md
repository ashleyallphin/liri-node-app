# Homework #10 liri-node-app
the-Coding-Boot-Camp-at-UT | UTA-VIRT-FSF-PT-01-2020-U-LOL


Ashley Allphin

# LIRI Bot
[Visit on Git Hub](https://github.com/ashleyallphin/liri-node-apps)


### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies using the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`



### What Each Command Does

1. `node liri.js concert-this '<artist/band name here>'`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (using moment to format this as "MM/DD/YYYY")

     ![concert-this](images/concert-this.gif)

   * If the user doesn't type an artist in, the program will output concert data for 'Garth Brooks'.

     ![concert-this Garth Brooks](images/concert-garth.gif)
    


2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in the terminal/bash window:

     * Artist

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

    ![spotify-this-song GIF](images/spotify-this-song.gif)


   * If no song is provided, LIRI  will default to "The Sign" by Ace of Base.

   
    ![spotify-this-song GIF](images/spotify-the-sign.gif)




3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

     ![movie-this](images/movie-this.gif)


   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     ![movie-this Mr. Nobody](images/movie-this-mr-nobody.gif)




4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It will run `spotify-this-song` for "I Want it That Way," as the text requests in `random.txt`.

     ![do-what-it-says](images/do-what-it-says.gif)


5. If the user types a command that LIRI doesn't recognize, LIRI suggests the following commands:

     ![unknown command](images/something-else.gif)




### Printing to log.txt

* In addition to logging the data to terminal/bash window, LIRI will output the data to a .txt file called `log.txt`.

![log.txt screenshot](images/logtxt_screenshot.png)



### Resources


   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

   * [OMDB API](http://www.omdbapi.com)
  
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)



   ### Key Topics
  * Node.js
  * process.argv
  * Client-server model
  * Request-response pattern
  * Axios
  * fs


  ### Learning Objectives
  * Initialize a Node.js project from the command line
  * Explain, import and utilize modules from the Node standard library
  * Install and import third-party dependencies in a Node.js application
  * Read, write and append files using the `fs` package
  * Write command line applications that process arguments input by users
  * Execute server-side HTTP requests to third-party APIs using Axios