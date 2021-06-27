import {typeOfCinema} from '../fetches/fetchRequests';
const addToQueueBtnRef = document.querySelector('[data-popup="backdrop"]')

addToQueueBtnRef.addEventListener('click', onQueueClick);

let itemsInQueue = JSON.parse(localStorage.getItem(`queue${typeOfCinema}`));

if (JSON.parse(localStorage.getItem(`queue${typeOfCinema}`)) === null) {
    console.log(1);
    itemsInQueue = [];
} else {
    itemsInQueue = JSON.parse(localStorage.getItem(`queue${typeOfCinema}`))
};


function onQueueClick(e) {
    const buttonQueue = document.querySelector('[data-queue]')
    const elementId = buttonQueue.dataset.id;


    if (e.target !== buttonQueue) {
        return;
    }
      const indexOfEl = itemsInQueue.indexOf(elementId);
  if (indexOfEl >= 0 && buttonQueue.textContent === "DELETE FROM QUEUE") {
      buttonQueue.textContent = "ADD TO QUEUE";
      itemsInQueue.splice(indexOfEl, 1);

    if (itemsInQueue.length === 0) {
        localStorage.removeItem(`queue${typeOfCinema}`);
        return
    }

      localStorage.setItem(`queue${typeOfCinema}`, JSON.stringify(itemsInQueue));
      return;
    }

    itemsInQueue.push(elementId)
    const uniqueItems = unique(itemsInQueue);
    localStorage.setItem(`queue${typeOfCinema}`, JSON.stringify(uniqueItems));
    buttonQueue.textContent = "DELETE FROM QUEUE";
};

function unique(idItems) {
    let result = [];

    for (const id of idItems) {
        if (!result.includes(id)) {
            result.push(id);
        }
    }

    return result;
}