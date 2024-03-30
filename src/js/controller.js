import * as model from './model.js';
import { MODE_CLOSE_SEC } from './config.js';
import recipeview from './views/recipeview.js';
import searchview from './views/searchview.js';
import resultsview from './views/resultsview.js';
import paginationview from './views/paginationview.js';
import bookmarksview from './views/bookmarksview.js';
import addRecipeview from './views/addRecipeview.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2
const recipeContainer = document.querySelector('.recipe');
const showrecipe = async function () {
  try {
    //gets the change of link
    const id = window.location.hash.slice(1);
    // when reloaded
    if (!id) return;
    //loading screen
    recipeview.renderSpinner();

    // update results view to mark selected search result
    resultsview.update(model.getsearchResultsPage());
    bookmarksview.update(model.state.bookmarks);
    //fetches the  data and gives the recipe object
    await model.loadRecipe(id);
    //sample for view
    recipeview.render(model.state.recipe);
    //apply html to webpage
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML(
      'afterbegin',
      recipeview._renderrecipe()
    );
  } catch (err) {
    recipeview._renderError(`${err}`);
    console.log(err);
  }
};

const controlSearchResult = async function () {
  try {
    // 1) get search querry
    resultsview.renderSpinner();
    const querry = searchview._getquerry();
    if (!querry) return;
    // 2) load search result
    await model.loadSearchResult(`${querry}`);

    // 3) render result
    //sends the recipe to (View through resultview) for obtaining the html
    resultsview.render(model.getsearchResultsPage(1));

    // 4) Render initial pagination
    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) render new result
  resultsview.render(model.getsearchResultsPage(goToPage));

  // 2) Render new pagination button
  paginationview.render(model.state.search);
};
const controlservings = function (newservings) {
  //update servings
  model.updateServings(newservings);
  //update the recipe view
  recipeview.update(model.state.recipe);
};

const controlAddBookMark = function () {
  // add or remove a book mark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //updaterecipe view
  recipeview.update(model.state.recipe);
  // render bookmark
  bookmarksview.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksview.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeview.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeview.render(model.state.recipe);

    //success message
    addRecipeview._rendermessage();

    //Render bookmark view
    bookmarksview.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      location.reload();
      addRecipeview.toggleWindow();
    }, MODE_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('😒😒', err);
    addRecipeview._renderError(err.message);
  }
};
const init = function () {
  bookmarksview.addHandlerRender(controlBookmarks);
  recipeview._addhandlerRender(showrecipe);
  recipeview.addHandlerupadateservings(controlservings);
  recipeview.addHandlerAndBookmark(controlAddBookMark);
  searchview.addHandlerSearch(controlSearchResult);
  paginationview.addHandlerClick(controlPagination);
  addRecipeview.addHandlerUpload(controlAddRecipe);
};
init();
