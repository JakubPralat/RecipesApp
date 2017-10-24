import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Recipe } from '../Recipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService]
})
export class AppComponent {
  recipes: Recipe[];
  title: string;
  description: string;
  ingredients: string;
  preparing: string;
  image: string;
  isAdded: boolean = false;
  rForm: FormGroup;
  post:any;
  
    constructor(private dataService:DataService, private fb: FormBuilder) {
      this.dataService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
      })
      this.rForm = fb.group({
        'title': [null, Validators.required],
        'description': [null, Validators.required],
        'ingredients': [null, Validators.required],
        'preparing': [null, Validators.required],
        'image': [null, Validators.required]
      });
     }

     addPost(post){
       this.title = post.title;
       this.description = post.description;
       this.ingredients = post.ingredients;
       this.preparing = post.preparing;
       this.image = post.image;
       this.addRecipe();
     }

     toggleAdd(){
       this.isAdded = !this.isAdded;
     }

     addRecipe(){
       var newRecipe = {
         title: this.title,
         description: this.description,
         ingredients: this.ingredients,
         preparing: this.preparing,
         image: this.image
       }
       this.dataService.addRecipe(newRecipe)
       .subscribe(recipe => {
         this.recipes.push(recipe);
         this.title='';
         this.preparing='';
         this.ingredients='';
         this.description='';
         this.image='';
         this.isAdded=false;
       })
     }

}
