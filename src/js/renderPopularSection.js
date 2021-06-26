import * as apiFetchRequest from './fetches/fetchRequests';
import renderPage from './pagination';
import debounce from 'lodash.debounce';
import { API_KEY } from './objects/API_KEY';
import { onLoader, stopLoader } from './main/loader';

const input = document.querySelector('.search-input');
input.addEventListener('input', debounce(onInputMovieDetails, 400));

input.addEventListener('keypress', event => {
  if (event.which === 13 || event.keyCode === 13) {
    event.preventDefault();
    // return false;
  }
});

let query = '';
let numberOfPage = 1;
let totalMovies;

function startPageTrending(key, page) {
  onLoader();
  apiFetchRequest.fetchTrending(key, page).then(movie => {
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage);

    stopLoader();
  });
}

function onInputMovieDetails(e) {
  query = e.target.value.toLowerCase().trim();
  numberOfPage = 1;
  if (!query) {
    startPageTrending(API_KEY, numberOfPage);
    return;
  }
  onLoader();
  apiFetchRequest.fetchSearchMovie(API_KEY, numberOfPage, query).then(movie => {
    totalMovies = movie.total_results;
    renderPage(totalMovies, numberOfPage, query);
    stopLoader();
  });
}

startPageTrending(API_KEY, numberOfPage);
