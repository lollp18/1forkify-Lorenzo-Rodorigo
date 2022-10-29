import {
  state,
  loadRecipe,
  loadSearchResult,
  getSearchResultsPage,
  updateServings,
  addBookmark,
  deleteBookmark,
  uploadRecipe,
  DeleteRecipe,
} from "./model.js";

import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultView from "./view/resultView.js";
import paginationView from "./view/paginationView.js";
import bookmakrsView from "./view/bookmakrsView.js";
import addRecipeView from "./view/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

import "url:core-js/stable";
import "url:regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const recipeContainer = document.querySelector(".recipe");

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipeDelete = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Remove bookmark
    deleteBookmark(state.recipe.id);
    // Update bookmark
    bookmakrsView.update(state.bookmarks);
    // Delete recipe
    await DeleteRecipe(id);
// refresh URL to origin
    window.location.assign(window.location.origin);

  } catch (e) {
    throw e;
  }
};

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //0 mark selected search

    resultView.update(getSearchResultsPage());

    // 1 Updating bookmarks view
    bookmakrsView.update(state.bookmarks);

    //2 loading the recipe

    await loadRecipe(id);

    // 3 Render recipe

    recipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();

    // get searchQuery
    const query = await searchView.getQuery();
    if (!query) return;

    //2) load  search
    await loadSearchResult(query);

    //3) Render results

    resultView.render(getSearchResultsPage());

    //4)Render inital paggination buttons

    paginationView.render(state.search);
  } catch (error) {
    throw new Error(error.message);
  }
};

const controlpagination = function (goToPage) {
  //1) Render NEW results

  resultView.render(getSearchResultsPage(goToPage));

  //2)Render NEW  paggination buttons

  paginationView.render(state.search);
};

const controlServings = function (newServings) {
  updateServings(newServings);

  recipeView.update(state.recipe);
};

const controlAddBookmark = function () {
  // add/remove bookmark

  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);

  // update recipeView
  recipeView.update(state.recipe);

  bookmakrsView.render(state.bookmarks);
};

const controlBookmarks = function () {
  bookmakrsView.render(state.bookmarks);
};

const controladdRecipe = async function (newRecipe) {
  try {
    // renderspinner

    addRecipeView.renderSpinner();
    // Uploaded new  data
    await uploadRecipe(newRecipe);

    //Render  recipe

    recipeView.render(state.recipe);

    // render bookmarks view
    bookmakrsView.render(state.bookmarks);

    // Change ID in URL

    window.history.pushState(null, "", `#${state.recipe.id}`);

    //Success message

    addRecipeView.renderMessage();

    // Close form window

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const Alertforlanguagesearch = function () {
  alert("Bitte suchen Sie in Englisch nach Rezepten");
};

const init = function () {
  recipeView.HandlerDeleteRecipe(controlRecipeDelete);
  bookmakrsView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlpagination);
  addRecipeView.addHandlerUploade(controladdRecipe);
};

init();
