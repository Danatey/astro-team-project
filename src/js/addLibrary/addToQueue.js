import { renderQueueList } from '../renderQueue';

const addToQueueBtnRef = document.querySelector('[data-popup="backdrop"]');
const key = localStorage.getItem('userId');
if (!key) {
  addToQueueBtnRef.addEventListener('click', onQueueClick);

  let itemsInQueue = JSON.parse(localStorage.getItem('queue'));

  if (JSON.parse(localStorage.getItem('queue')) === null) {
    itemsInQueue = [];
  } else {
    itemsInQueue = JSON.parse(localStorage.getItem('queue'));
  }

  function onQueueClick(e) {
    const buttonQueue = document.querySelector('[data-queue]');
    const labraryBtn = document.querySelector('.library-js');

    if (e.target !== buttonQueue) {
      return;
    }
    const elementId = buttonQueue.dataset.id;
    const indexOfEl = itemsInQueue.indexOf(elementId);
    if (indexOfEl >= 0 && buttonQueue.textContent === 'DELETE FROM QUEUE') {
      buttonQueue.textContent = 'ADD TO QUEUE';
      itemsInQueue.splice(indexOfEl, 1);

      if (itemsInQueue.length === 0) {
        localStorage.removeItem('queue');
        if (labraryBtn.classList.contains('logo-current')) {
          renderQueueList();
        }
        return;
      }

      localStorage.setItem('queue', JSON.stringify(itemsInQueue));
      if (labraryBtn.classList.contains('logo-current')) {
        renderQueueList();
      }
      return;
    }

    itemsInQueue.push(elementId);
    const uniqueItems = unique(itemsInQueue);
    localStorage.setItem('queue', JSON.stringify(uniqueItems));
    buttonQueue.textContent = 'DELETE FROM QUEUE';
    if (labraryBtn.classList.contains('logo-current')) {
      renderQueueList();
    }
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
}
