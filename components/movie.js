'use strict'
const axios = require("axios");
const cache = require("./cache.js")

class Movie {
    constructor(movie){
        this.title = movie.title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = movie.poster_path;
        this.popularity = movie.popularity;
        this.released_on = movie.released_on;
    }
}

function createPoster(movieData){
    const movieObjects = movieData.data.results.map(movie =>{
        return new Movie(movie)
    });
    return movieObjects;
}

async function grabMovie (request, response) {
    const Query = request.query.searchquery;
    const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.Movie_API_Key}&query=${Query}&page1`;
    console.log(Query)
  
    if(cache.cache.movie[Query] && (Date.now() - cache.cache.movie[Query].time < 604800000)){
        response.render(cache.cache.movie[Query]);
        
    } else {
        const grabNewMovie = await axios.get(movieAPI).then(response => createPoster(response))
        let cachedMovie = {
            data: grabNewMovie,
            time: Date.now(),
        }
        cache.cache.movie[Query] = cachedMovie;
        response.status(200).send(cachedMovie);
    };
};


module.exports={grabMovie};
