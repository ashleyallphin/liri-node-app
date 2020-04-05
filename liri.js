//requre dotenv
require("dotenv").config();


//require keys.js
var keys = require('./keys.js');

//packages
var Spotify = require ('node-spotify-api');
var request = require ('request');
var moment = require ('moment');


var spotify = new Spotify(keys.spotify);

var fs = require ("fs"); 

var nodeArguments = process.argv;

var searchTerm = "";
var nextSearchTerm = "";

for (var i = 3; i < nodeArguments.length; i++) {

    if (i > 3 && i < nodeArguments.length) {
        searchTerm = searchTerm + "%20" + nodeArguments[i];
    }
    else {
        searchTerm += nodeArguments[i];
    }
    console.log(searchTerm);
}


var commandLine = process.argv[2];
console.log(commandLine);
console.log(process.argv);
findIt();

//call LIRI bot
function findIt() {
    //switch statement for each command
    switch (commandLine) {
        
        //to use Bands in Town
        case "concert-this":

            var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
            request(queryURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var data = JSON.parse(body);
                    for (var i = 0; i < data.length; i++) {
                        console.log("Venue: " + data[i].venue.name);
                        fs.appendFileSync("log.txt", "Venue: " + data[i].venue.name + "\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });

                        if (data[i].venue.region == "") {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                                if (error) {
                                    console.log(error);
                                
                            };

                        } else {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                            
                        }

                        var date = data[i].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log("Date: " + date)
                        fs.appendFileSync("log.txt", "Date: " + date + "\n("******************")n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                        console.log("******************")
                    }
                }
            });

            break;


        //to search Spotify
        case "spotify-this-song":

                    //if there's no song, return Ace of Base's "The Sign"
                    if (!searchTerm) {
                        searchTerm = "The%20Sign%20Ace%20of%20Base";
                        nextsearchTerm = searchTerm.replace(/%20/g, " ");
                    }
            
            spotify.search({
                type: "track",
                query: searchTerm
            }, function (err, data) {
                
                
                if (err) {
                    console.log("Error occured: " + err)
                }

                var results = data.tracks.items;

                for (var i = 0; i < results.length; i++) {
                    var albumObject = results[i].album;
                    var trackName = results[i].name;
                    var preview = results[i].preview_url;
                    var artistsResults = albumObject.artists;
                    for (var j = 0; j < artistsResults.length; j++) {
                        console.log("Artist: " + artistsResults[j].name);
                        console.log("Song: " + trackName);
                        console.log("Song preview: " + preview);
                        console.log("Album: " + albumObject.name);
                        console.log("******************")
                    }
                }
            })

            break;



        case "movie-this":
            //if there's no movie name, use Mr. Nobody
            if (!searchTerm) {
                searchTerm = "Mr%20Nobody";
                nextsearchTerm = searchTerm.replace(/%20/g, " ");
            }

            var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy"
            request(queryURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var results = JSON.parse(body);
                    console.log("Title of the movie: " + results.Title);
                    console.log("Year the movie came out: " + results.Year);
                    console.log("IMDB Rating of the movie: " + results.Ratings[0].Value);
                    console.log("Rotten Tomatoes Rating of the movie: " + results.Ratings[1].Value);
                    console.log("Country where the movie was produced: " + results.Country);
                    console.log("Language of the movie: " + results.Language);
                    console.log("Plot of the movie: " + results.Plot);
                    console.log("Actors in the movie: " + results.Actors);

                }
            });

            break;
    }
}

if (commandLine == "do-what-it-says") {
    var fs = require("fs");

    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }

        var textArr = data.split(",");
        commandLine = textArr[0];
        searchTerm = textArr[1];
        findIt();
    })
}


