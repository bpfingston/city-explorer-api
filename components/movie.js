const axios = require("axios");

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

async function grabMovie(request, response){
    const searchQuery = request.query.searchquery;
    const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.Movie_API_Key}&query=${searchQuery}&page1`;
    console.log(movieAPI);
    const movieData = await axios.get(movieAPI);
    console.log(movieData.data)
    response.status(200).send(createPoster(movieData));
    console.log(movieData.data);
}

module.export = {grabMovie};