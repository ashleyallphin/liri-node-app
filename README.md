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

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (using moment to format this as "MM/DD/YYYY")

    


2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window:

     * Artist

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided, LIRI  will default to "The Sign" by Ace of Base.

   




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

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     




4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.






### Printing to log.txt

* In addition to logging the data to terminal/bash window, LIRI will output the data to a .txt file called `log.txt`.



### Technologies Used


   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

   * [OMDB API](http://www.omdbapi.com)
  
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)