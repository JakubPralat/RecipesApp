import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http:Http) {
    console.log('DataService initialized...');
   }

   getRecipes(){
     return this.http.get('/api/recipes')
     .map(res => res.json());
   }

   addRecipe(newRecipe){
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post('/api/recipe', JSON.stringify(newRecipe), {headers: headers})
    .map(res => res.json());
   }

   getOneRecipe(RecipeID){
      return this.http.get('/api/recipe/' + RecipeID)
      .map(res => res.json());
   }

   updateRecipe(recipeToSave, recipeID) {
    var newRecipe = {
      title: recipeToSave.title,
      description: recipeToSave.description,
      ingredients: recipeToSave.ingredients,
      preparing: recipeToSave.preparing,
      image: recipeToSave.image
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/recipe/' + recipeID, JSON.stringify(newRecipe), {headers: headers})
    .map(res => res.json());
   }

   deleteRecipe(RecipeID){
     return this.http.delete('/api/recipe/' + RecipeID);
   }
}
