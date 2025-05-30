import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';



import 'core-js/stable';
import 'regenerator-runtime/runtime';





// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////



const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);
    
    
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    
  } catch(err) {
    console.error(err);
    recipeView.renderError();
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    console.log(model.state.search.results);
  } catch(err){
    console.log(err)
  }
}



const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);