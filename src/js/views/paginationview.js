import icons from 'url:../../img/icons.svg';
import view from './view.js';

class paginationview extends view {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    document
      .querySelector('.pagination')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.btn--inline');
        const goToPage = Number(btn.dataset.goto);
        handler(goToPage);
      });
  }
  _renderrecipe() {
    const curPage = this._data.page;
    Number(curPage);
    console.log(typeof curPage);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsperpage
    );
    console.log(typeof numPages);
    Number(numPages);
    // page 1 ,and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return `<button  data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    //other page
    if (curPage < numPages) {
      return `<button  data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg  class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button  data-goto="${curPage + 1}"
    class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // page 1 ,and there are no other pages
    return '';
  }
}
export default new paginationview();
