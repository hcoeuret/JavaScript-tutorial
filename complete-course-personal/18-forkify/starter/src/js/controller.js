import * as model from './model.js'
import recipeView from './views/recipeView.js';

import 'core-js/stable';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner(recipeContainer);
    
    // 1 - Getting recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;
    
    // 2 - Rendering recipe
    recipeView.render(model.state.recipe);    
  }
  catch(err){
    alert(err);
  }
}

controlRecipes();

['hashchange','load'].forEach(ev => window.addEventListener(ev, controlRecipes))


