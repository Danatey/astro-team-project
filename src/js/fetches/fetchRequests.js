import { API_KEY } from '../objects/API_KEY';
let typeOfCinema;
//const typeOfCinemaTranding = 'tv/popular'
const typeOfCinemaTranding = 'trending/movie/day'
if(typeOfCinemaTranding === 'tv/popular') {
  typeOfCinema = 'tv'
} else {
  typeOfCinema = 'movie'
}

function fetchTrending(key, page) {
  return fetch(`https://api.themoviedb.org/3/${typeOfCinemaTranding}?api_key=${key}&page=${page}`)
    .then(response => {
      return response.json();
    })
    
     .catch('onError');
}

function fetchSearchMovie(API_KEY, numberOfPage, query) {
  return fetch(
    `https://api.themoviedb.org/3/search/${typeOfCinema}?api_key=${API_KEY}&language=en-US&page=${numberOfPage}&include_adult=false&query=${query}`,
  )
    .then(response => {
      return response.json();
    })
    .catch('onError');
}

function fetchMovieDetails(id) {
  return fetch(`https://api.themoviedb.org/3/${typeOfCinema}/${id}?api_key=${API_KEY}&language=en-US`)
    .then(response => {
      return response.json();
    })
    .catch('onError');
}

export { fetchTrending, fetchSearchMovie, fetchMovieDetails, typeOfCinema };
