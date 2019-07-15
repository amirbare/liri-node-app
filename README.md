# liri-node-app
Node APP with spotify, bands in town, and OMDB


This application takes 2 inputs to give you concert information, song information, movies information and a bonus function that runs a function from the random.txt file

In order to run the application you must install axios, moment, spotify, fs, you will also need your own spotify API key.

1. The first step is type node liri.js movie-this "name of movie in quotes"

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.

2. The second step is type node liri.js concert-this "name of band in quotes"

    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")

3. The third step is type node liri.js spotify-this-song "name of band in quotes"

    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

4. The fourth step is type node liri.js do-what-it-says 
The fourth step run the spotify function which grabs data from the random.txt