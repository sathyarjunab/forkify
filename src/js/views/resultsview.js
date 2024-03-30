import icons from 'url:../../img/icons.svg';
import view from './view.js';
class Resultsview extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your querry!! please try again';
  _message = '';
  _renderrecipe() {
    const id = window.location.hash.slice(1);
    let mapty = this._data
      .map(e => {
        return `<li class="preview">
      <a class="preview__link ${
        e.id === id ? 'preview__link--active' : ''
      }" href="#${e.id}">
        <figure class="preview__fig">
          <img src="${e.image}" alt="${e.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${e.title}</h4>
          <p class="preview__publisher">${e.publisher}</p>
          <div class="recipe__user-generated ${e.key ? '' : 'hidden'}">
            <svg>
            <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
      })
      .join('');
    return mapty;
  }
}
export default new Resultsview();
