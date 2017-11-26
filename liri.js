
//get the 3rd argument which will be one of the following:
//`my-tweets` OR `spotify-this-song` OR `movie-this` OR `do-what-it-says`
var userCommand = process.argv[2];

switch(userCommand) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;  
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;  
  default:
  //code block
}

function myTweets() {

  // get twitter keys from keys.js
  var twitterKeys = require('./keys.js');
  console.log("Twitter consumer_key is: " + twitterKeys.consumer_key);

} //end myTweets function

function spotifyThisSong() {

  //get the song from the terminal/command line
  // Store all of the arguments in an array
  var nodeArgs = process.argv;
  
    // Create an empty variable for holding the movie name
    var songName = "";
    var defaultSearch = false;
  
    //If no song name, default to "The Sign" by Ace of Base
    if (process.argv[3] === undefined) {

      defaultSearch = true;

    }
    else {
  
      // Loop through all the words in the node argument and format for query with " " between words
      for (var i = 3; i < nodeArgs.length; i++) {
  
        if (i > 3 && i < nodeArgs.length) {
  
          songName = songName + " " + nodeArgs[i];
  
        }
  
        else {
  
          songName += nodeArgs[i];
  
        }
      } //end for
  
    } //end else
  
  //need the node-spotify-api
  var Spotify = require('node-spotify-api');

  //set up the id and secret
  var spotify = new Spotify({
        id: '5b329d31ecbf4edb94f1f440bc2f0bc4',
        secret: 'daa829ae018b4f709096998c3ea119a0'
  });
   
  //if no song specified, default to "The Sign" by Ace of Base
  if (defaultSearch) {

    spotify.search({ type: 'track,artist', query: 'The Sign%20artist:Ace of Base' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      
      console.log('Name of the artist: '+data.tracks.items[0].artists[0].name);
      console.log('Name of the track: '+data.tracks.items[0].name);
      console.log('Name of the album: '+data.tracks.items[0].album.name);
      console.log('Spotify link for the track: '+data.tracks.items[0].album.external_urls.spotify);
      
    });
  } //end if defaultSearch

  //else search with given song
  else {
  
    spotify.search({ type: 'track', query: songName }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          
          console.log('Name of the artist: '+data.tracks.items[0].artists[0].name);
          console.log('Name of the track: '+data.tracks.items[0].name);
          console.log('Name of the album: '+data.tracks.items[0].album.name);
          console.log('Spotify link for the track: '+data.tracks.items[0].album.external_urls.spotify);
          
    });
  }//end of search by given song

} //end spotifyThisSong function

function movieThis() {

  //get the OMDB api key from keys.js
  var omdbKey = require('./keys.js');

  // Include the request npm package
  var request = require("request"); 

  // Store all of the arguments in an array
  var nodeArgs = process.argv;

  // Create an empty variable for holding the movie name
  var movieName = "";

  //If no movie name, default to "Mr. Nobody"
  if (process.argv[3] === undefined) {

    movieName = "Mr. Nobody";

  }
  else {

    // Loop through all the words in the node argument and format for query with "+" between words
    for (var i = 3; i < nodeArgs.length; i++) {

      if (i > 3 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

      }

      else {

        movieName += nodeArgs[i];

      }
    }

  } //end else

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=" + omdbKey.api_key;

  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      
      // get the info we want and display to terminal/console
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
      console.log("Country Where Produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);      
    }
  });

  
} //end movieThis function

function doWhatItSays() {

  // use fs Node package for reading and writing files
  var fs = require("fs");
  // read text from random.txt and place in the variable "data"
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    for (var i = 0; i < dataArr.length; i++) {
      dataArr[i] = dataArr[i].trim();
    }

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

  }); //end fs.readFile
  
} //end doWhatItSays function
