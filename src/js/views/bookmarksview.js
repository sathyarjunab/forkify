import icons from 'url:../../img/icons.svg';
import previewview from './previewview.js';
import view from './view.js';
class bookmarksview extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmark yet. Find somthing to make in home you lazzy asssssssssssss';
  _message = '';

  addHandlerRender(handle) {
    window.addEventListener('load', handle);
  }
  _renderrecipe() {
    return this._data
      .map(bookmark => previewview.render(bookmark, false))
      .join('');
  }
}
export default new bookmarksview();
