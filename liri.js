require("dotenv").config();

//Creating variables loading npm packages

var Twitter = require('twitter');
var Spotify = require('spotify');


var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');

var commandType = process.argv[2];
var commandObj = process.argv[3];
var tweetsArr = [];

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);



//----------------FUNCTIONS-------------------------------

//Function to process the input commands
function nodeCommands(commandType, commandObj) {
    switch(commandType) {
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song' :
            // if(commandObj === undefined) {
            //     commandObj = songDefault;
            // }
            spotifyThis(commandObj);
            break;
        case 'movie-this' :
            // if (commandObj === undefined) {
            //     commandObj = movieDefault;
            // }
            movieThis(commandObj);
            break;
        case 'do-what-it-says' :
            doWhatItSays();
            break;
        default :
            console.log("Please type valid commands: my-tweets spotify-this-song or do-what-it-says");
    }
}

    //Function to get my tweets'
    function getMyTweets() {
        var params = {
            screen_name: 'Phung Pham', 
            count: 3, 
            exclusive_replies: true, 
            trim_user: true
        };
        client.get('statuses/user_timeline', params, function(err, tweets, response) {
            if(err) {
                console.log("-------------ERROR-------------------")
                console.log(err);
                console.log("-------------ERROR-------------------");
                
            }
            else {
                tweetsArr = tweets;
                for (i=0; i < tweetsArr.length; i++) {
                    console.log("Created at: " + tweetsArr[i].created_at);
                    console.log("Text: " + tweetsArr[i].text);
                    console.log("---------------------------------------");
                }
            }
        });
    }

    //Function to spotify requested song
    function spotifyThis(song) {
        //if song is not specified, change to default song
        if (song === "") {
            song = "The Sign";
        }
        spotify.search({search: 'track', query: song}, function(err, data) {
            if(err) {
                console.log('Erorr:  ' + err);
                return;
            }
            var song = data.tracks.items[0];
            console.log("----------Artists-------------");
            for (i =0; i < song.artists.length; i++) {
                console.log(song.artists[i].name);
            }
            console.log("----------Song Name----------")
            console.log(song.name);

            console.log("------------Preview----------");
            console.log(song.preview_url);

            console.log("------------Album-----------");
            console.log(song.album.name);
            
        });
    }

    //Function to get the move info
    function movieThis(movieName) {
        console.log(movieName);
        var movieName = commandObj;
        var queryUrl = "https://www.omdbapi.com/?t=" + movieName + "&apikey=978095c9";
        console.log(queryUrl);

        request(queryUrl, function(err, response,body){
            if (!err && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(BODY).Year);
                console.log("IMDB Rating" + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating " + JSON.parse(body).Rated);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
    //Function for "do what It say"
    function doWhatItSays() {
        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) {
                console.log("ERROR--------------------------");
                return console.log(err);
                console.log("ERROR--------------------------");
            }
            nodeCommands(dataArr[0], dataArr[1]);
        });
    }

nodeCommands(commandType, commandObj);