
// VARIABLES ------------------------------------------------------------------
require("dotenv").config();

var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// include file system module
var fs = require("fs");

//user inputs
var commandLine = process.argv.slice(2)[0];

//search terms
var movie = [];
var song = [];
var artist = [];


// INPUT POSSIBILITIES ------------------------------------------------------------------


//if input is "do-what-it-says", run function doIt()
//if anything else, run switchCase()
if (commandLine === "do-what-it-says") {
    doIt();
} else {
    switchCase();
}

//function to read random.txt (search for song "I Want It That Way")
function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.error("An error occured: " + error);
            return;
        }
        var randomTxt = data.split(",");
        commandLine = randomTxt[0];
        process.argv.slice(2).slice(1) = randomTxt.slice(1);
        switchCase();
    });
}

//switchCase() for each function LIRI can do
function switchCase() {
    switch (commandLine) {

        //if "spotify-this-song", run findSong()    
        case "spotify-this-song":
            if (Array.isArray(process.argv.slice(2).slice(1)) && process.argv.slice(2).slice(1).length) {
                searchSong = String(process.argv.slice(2).slice(1));
                song = process.argv.slice(2).slice(1).join("").replace(/['"]+/g, "");
                findSong();
            } else {
            //if no movieInput, use search term "the sign"
                song = "the sign ace of base";
                findSong();
            }
            break;

        //if "movie-this", run findMovie()
        case "movie-this":
            if (Array.isArray(process.argv.slice(2).slice(1)) && process.argv.slice(2).slice(1).length) {
                movieInput = String(process.argv.slice(2).slice(1));
                movie = process.argv.slice(2).slice(1).join("+").replace(/['"]+/g, "");
                findMovie();
            } else {
                //if no movieInput, use search term "Mr.Nobody"
                movie = "Mr.Nobody";
                findMovie();
            }
            break;
    
            //if "concert-this", run findConcert()
        case "concert-this":
            if (Array.isArray(process.argv.slice(2).slice(1)) && process.argv.slice(2).slice(1).length) {
                searchArtist = String(process.argv.slice(2).slice(1));
                artist = process.argv.slice(2).slice(1).join("").replace(/['"]+/g, "");
                findConcert();
            } else {
            //if no artist input, use search term "garth brooks"
                artist = "garth brooks";
                findConcert();
            }
            break;

        //default case, if commandLine isn't recognized    
        default:
            console.log("LIRI doesn't know that.")
    
    }
}

// CALL FUNCTIONS ------------------------------------------------------------------


//Spotify search function
function findSong() {
    spotify
        .search({ type: "track", query: song })
        .then(function(response) {
            for (var i = 0; i < 5; i++) {
                
                console.log("Search term: " + song);
                console.log("Artist: " + response.tracks.items[i].artists[0].name);
                console.log("Song title: " + response.tracks.items[i].name);
                console.log("Preview: " + response.tracks.items[i].preview_url);
                console.log("Album: " + response.tracks.items[i].album.name);
                console.log("------------------------");

                printText = "Search term: " + song + "\r\n "
                + "Artist: " + response.tracks.items[i].artists[0].name + "\r\n "
                + "Song title: " + response.tracks.items[i].name + "\r\n "
                + "Preview:  " + response.tracks.items[i].preview_url + "\r\n "
                + "Album : " + response.tracks.items[i].album.name;
                + "\n----------------\n";

                fs.appendFile("log.txt", "\r\n " + printText, function(error) {
                    if (error) {
                        return console.log("An error occurred: " + error);
                    }
                    else {
                        console.log("Added to log.txt!")
                    }
                });
            }
        })
        .catch(function(error) {
            console.log("An error occurred: " + error);
        });
}

//Bands in Town search function
function findConcert() {
    var BandsInTownQueryURL =
        "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios
        .get(BandsInTownQueryURL)
        .then(function(response) {
            for (var i = 0; i < 5; i++) {

                console.group("Artist: " + artist);
                console.log("Venue: " + response.data[i].venue.name );
                console.log("Location: " + response.data[i].venue.region);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("------------------------");

                
                printText = "Artist: " + artist + "\r\n "
                + "Venue: " + response.data[i].venue.name + "\r\n"
                + "Location: " + response.data[i].venue.region + "\r\n"
                + "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY")
                + "\n----------------\n";

                fs.appendFile("log.txt", "\r\n " + printText, function(error) {
                    if (error) {
                        return console.log("An error occured: " + error);
                    }
                    else {
                        console.log ("Added to log.txt!")
                    }
                });
            }
        })
        .catch(function(error) {
            if (error) {
                console.log("An error occured: " + error);
            }
        });
}

//OMDB search function
function findMovie() {
    var omdbQueryURL =
        "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    axios
        .get(omdbQueryURL)
        .then(function(response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Actors: " + response.data.Actors);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("------------------------");


            printText =
            "Movie Title: " + response.data.Title + "\r\n "
            + "Year: " + response.data.Year + "\r\n "
            + "Actors: " + response.data.Actors + "\r\n "
            + "IMDB Rating: " + response.data.imdbRating + "\r\n "
            + "Rotten Tomatoes rating: " + response.data.Ratings[1].Value + "\r\n"
            + "Country: " + response.data.Country + "\r\n "
            + "Language(s): " + response.data.Language + "\r\n "
            + "Plot: " + response.data.Plot + "\r\n "
            + "\n----------------\n";

            fs.appendFile("log.txt", "\r\n " + printText, function(error) {
                if (error) {
                    return console.log("An error occured: " + error);
                }
                else {
                    console.log ("Added to log.txt!")
                }
            });
        })
        .catch(function(error) {
            if (error) {
                console.log("An error occured: " + error);
            }
        });
}

