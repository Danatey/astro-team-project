import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as apiFetchRequest from './fetchRequests';
import renderPage from './pagination';
import debounce from 'lodash.debounce';
import { API_KEY } from './API_KEY';

const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 300));

const movieId = '10580';
const mediaType = 'movie';
let query = '';
let numberOfPage = 1;
let totalMovies;

function startPageTrending(key, page) {
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage);
  });
}

function onInputMovieDetails(e) {
  query = e.target.value.toLowerCase().trim();
  numberOfPage = 1;
  // if (query.length < 1) {
  //   onInputTrending(API_KEY);
  //   return;
  // }
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    console.log('query: ', query);
    console.log('numberOfPage: ', numberOfPage);
    totalMovies = movie.total_results;
    console.log('totalMovies: ', totalMovies);
    renderPage(totalMovies, numberOfPage, query);
  });
}

function onInputMovie(id, key) {
  apiFetchRequest.fetchMovieDetails(id, key).then(movie => {
    console.log(movie);
  });
}

startPageTrending(API_KEY, numberOfPage);

// onInputMovieDetails(API_KEY);
// onInputMovie(movieId, API_KEY);
