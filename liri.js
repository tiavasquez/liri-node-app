
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

  // get spotify id from keys.js
  var spotifyId = require('./keys.js');
  console.log("Spotify client_id is: " + spotifyId.client_id);

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

} //end spotifyThisSong function

function movieThis() {

  //get the OMDB api key from keys.js
  var omdbKey = require('./keys.js');
  console.log("OMDB API key is: " + omdbKey.api_key);

  // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
  var request = require("request");

  // Grab the movieName which will always be the third node argument.
  var movieName = process.argv[2];

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Release Year: " + JSON.parse(body).Year);
    }
  });

  
} //end movieThis function

function doWhatItSays() {
  
} //end doWhatItSays function
