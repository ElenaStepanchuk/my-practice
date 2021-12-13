import { films } from "./trending_films";
import { articles } from "./trending_films";
// import { getFilms } from "./getFilms";
// import { makeGenres } from "./makeGenres"

  const refs = {
   closeModalCardBtn: document.querySelector('[data-modal-card-close]'),
    modalCard: document.querySelector('[data-modal-card]'),
  };

  films.addEventListener('click', handleModalCardOpen);
  refs.closeModalCardBtn.addEventListener('click', handleModalCardClose);

  function handleModalCardOpen() {
    if (refs.modalCard.classList.contains('is-hidden')) {
      document.addEventListener('keydown', handleModalCardEsc);
      refs.modalCard.classList.remove('is-hidden');
      console.log('Модалка с карточкой фильма открыта');
      // getFilms().then(createModalCard)
    
  } return;
}
    
function handleModalCardClose() {
  if (!refs.modalCard.classList.contains('is-hidden')) {
      refs.modalCard.classList.add('is-hidden');
      console.log('Модалка с карточкой фильма закрыта кнопкой "Х"');
      
  }
  return;
}
  
function handleModalCardEsc(event) {
  if (event.keyCode === 27) {
    refs.modalCard.classList.add('is-hidden');
    console.log('Модалка с карточкой фильма закрыта кнопкой "ESC"');
    document.removeEventListener('keydown', handleModalCardEsc);
    // document.removeEventListener('mousedown', handleModalCardClickClose);
  } return;
}
// ---------------

const KEY_API = '221ed015def0321f18a85f3fc7b4d6fa';

films.addEventListener('click', handleModalCardOpen);
  
function handleModalCardOpen(event) {
    event.preventDefault()
  if (event.target.nodeName !== 'IMG') return;
  moviId = event.target.id;
  // console.log(moviId);
  modalWindowAPI(moviId).then(markUpModal).catch(error => console.log(error))
  // console.log('Модалка с карточкой фильма открыта');
  getGanres(moviId).then(markUpModal).catch(error => console.log(error))
  // console.log(getGanres(moviId).then(markUpModal));


  // instance.show();
  
}
async function modalWindowAPI(moviId) {
    try {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${moviId}?api_key=${KEY_API}&language=en-US`)
    const array = data.genres.flat(2)
    const arrayNames = []
    for (const arr of array) {
      arrayNames.push(arr.name)
      console.log(arrayNames);
      // return arrayNames;
    } 

      return data;
     
        
    } catch (error) {
        error => console.log(error);
    }
}

function markUpModal({ poster_path, title, vote_average, vote_count, popularity, original_title, overview, arrayNames, id }) {
    const instance = basicLightbox
      .create(
        `<div class="modal">
     <div class="film-card-modal-window">
     <button class="close-modal-window-btn" data-modal-card-close>
<svg class="icon-close-modal">
    <use class="icon-close-modal-svg" href="./image/modal-window-card/symbol-defs.svg#icon-close-black">
    </use>
</svg>
    </button>
<img class="film-exemple-photo" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="Фото фільму">
    <div class="modal-window-signature">
    <h2 class="film-title-modal-window">${title}</h2>
    <div class="window-characteristics">
    <ul class="modal-window-characteristics">
    <li class="modal-window-vote list">Vote&nbsp;/&nbsp;Votes</li>
    <li class="modal-window-popularity list">Popularity</li>
    <li class="modal-winwow-original-title list">Original Title</li>
    <li class="modal-window-gener list">Genre</li>
    </ul>

    <ul class="modal-window-characteristics-value">
    <li class="modal-window-vote-value list"><span class="modal-window-vote__span">${vote_average}</span>/&nbsp;&nbsp;${vote_count}</li>
    <li class="modal-window-popularity-value list">${popularity}</li>
    <li class="modal-winwow-original-title-value list">${original_title}</li>
    <li class="modal-window-gener-value list">{arrayNames}</li>
</ul>
</div>
<h3 class="modal-window-about">About</h3>
<p class="modal-window-description">${overview}</p>
<div class="btn-menu-module-card">
<button id="${id}" class="btn-watched-modal-window">${localWatched.includes(id) ? `remove from watched` : `add to watched`}</button>
<button id="${id}" class="btn-queue-modal-window">${localQueue.includes(id) ? `remove from queue` : `add to queue`}</button>
         </div>
        </div>
    </div>
</div>`, {
          onShow: (instance) => {
            instance.element().querySelector('a').onclick = instance.close
        }
          }).show();
}
  
// ___________________________

, {
      onShow: () => {
        window.addEventListener('keydown', handleKeydown);
        
      },
      onClose: () => {
        window.removeEventListener('keydown', handleKeydown);
        console.log('Модалка с карточкой фильма закрыта кликом вне области модалки');
      },
    });

  instance.show()
  function handleKeydown({ key }) {
    switch (key) {
        case 'Escape':
        instance.close();
        console.log('Модалка с карточкой фильма закрыта кликом по кнопке "ESC"');
        break;
    
      default:
        alert('Что-то пошло не так!');
    }

  }
}