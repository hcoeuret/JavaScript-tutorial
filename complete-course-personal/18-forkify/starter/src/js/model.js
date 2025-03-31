import 'regenerator-runtime/runtime';
import { API_URL } from "./config";  
import { RES_PER_PAGE } from "./config";  
import { getJSON } from "./helper";


export const state = {
  recipe: {},
  search: {
    query : '',
    results : [],
    page : 1,
    resultsPerPage : RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function(id){
  try{
    const data = await getJSON(`${API_URL}${id.slice(1)}`);
    const {recipe} = data.data

    state.recipe = {
      id: `#${recipe.id}`,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
      
    }

    if(state.bookmarks.some(rec => rec.id === id))
      state.recipe.bookmarked = true;
    else
      state.recipe.bookmarked = false;

  }
  catch(err){
    throw err;
  }
}

export const loadSearchResult = async function(query){
  try{
    state.search.query = query
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: `#${rec.id}`,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url 
      }
    }) 
  }
  catch(err){
    throw err;
  }
}

export const getSearchResultsPage = function(page = 1){
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end); 
}

export const updateServings = function(newServing){
  if(newServing <= 0) return;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServing/state.recipe.servings)
})
  state.recipe.servings = newServing;
}

const persistBookmarks = function(){
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe){
  
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  state.recipe.bookmarked = true;

  persistBookmarks();
}

export const removeBookmark = function(id){
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id)
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;

  persistBookmarks();
}

const init = function(){
  const storage = localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearBookmarks = function(){
  localStorage.clear('bookmarks');
};
//clearBookmarks();
