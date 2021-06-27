import { onError } from '../renderPopularSection';
import { API_KEY } from '../objects/API_KEY';
import {typeOfCinema} from '../fetches/fetchRequests';


function fetchMovieGenres () {
   return fetch(`https://api.themoviedb.org/3/genre/${typeOfCinema}/list?api_key=${API_KEY}&language=en-US`)
    .then(response =>  {
        return response.json()
    })
    .catch('onError');
}