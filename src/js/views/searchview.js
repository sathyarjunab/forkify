class searchView {
  #parentEl = document.querySelector('.search');

  _getquerry() {
    const querry = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return querry;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handel) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handel();
    });
  }
}
export default new searchView();
