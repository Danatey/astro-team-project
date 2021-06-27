import {typeOfCinema} from '../fetches/fetchRequests';
const addToWatchedBtnRef = document.querySelector('[data-popup="backdrop"]');

addToWatchedBtnRef.addEventListener('click', onWatchedClick);

let itemsInWatched = JSON.parse(localStorage.getItem(`watched${typeOfCinema}`));

if (JSON.parse(localStorage.getItem(`watched${typeOfCinema}`)) === null) {
  itemsInWatched = [];
} else {
  itemsInWatched = JSON.parse(localStorage.getItem(`watched${typeOfCinema}`));
}

function onWatchedClick(e) {
  const buttonWatched = document.querySelector('[data-watched]');
  const elementId = buttonWatched.dataset.id;
  
  if (e.target !== buttonWatched) {
    return;
  }
  const indexOfEl = itemsInWatched.indexOf(elementId);
  if (indexOfEl >= 0 && buttonWatched.textContent === "DELETE FROM WATCHED") {
      buttonWatched.textContent = "ADD TO WATCHED";
      itemsInWatched.splice(indexOfEl, 1);

      if (itemsInWatched.length === 0) {
        localStorage.removeItem(`watched${typeOfCinema}`);
        return
    }
    
      localStorage.setItem(`watched${typeOfCinema}`, JSON.stringify(itemsInWatched));
      return;
    }
 
  itemsInWatched.push(elementId);
  const uniqueItems = unique(itemsInWatched);
  localStorage.setItem(`watched${typeOfCinema}`, JSON.stringify(uniqueItems));
  buttonWatched.textContent = "DELETE FROM WATCHED";
  
  return;
}

function unique(idItems) {
  let result = [];

  for (const id of idItems) {
    if (!result.includes(id)) {
      result.push(id);
    }
  }

  return result;
}
