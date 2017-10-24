import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Recipe } from '../../../Recipe';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  isEdited: boolean = false;
  public recipeID;
  recipe: Recipe = {
    title:"",
    description:"",
    ingredients:"",
    preparing:"",
    image:"",
    _id:this.recipeID
  }
  title: string;r
  description: string;
  ingredients: string;
  preparing: string;
  image: string;
  isAdded: boolean = false;
  rForm: FormGroup;
  post:any;

  constructor(private dataService:DataService,private router:Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.rForm = fb.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'ingredients': [null, Validators.required],
      'preparing': [null, Validators.required],
      'image': [null, Validators.required]
    });
   }

  ngOnInit() {
    this.recipeID = this.route.snapshot.params['recipeID'];
    this.dataService.getOneRecipe(this.recipeID)
    .subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  editPost(post){
    this.recipe.title = post.title;
    this.recipe.description = post.description;
    this.recipe.ingredients = post.ingredients;
    this.recipe.preparing = post.preparing;
    this.recipe.image = post.image;
    this.recipe._id=this.recipeID;
    this.toggleEdit();
    this.editRecipe(this.recipe, this.recipeID);
    window.location.reload;
  }

  toggleEdit(){
    this.isEdited = !this.isEdited;
  }

  editRecipe(recipeToSave, ID){
    this.dataService.updateRecipe(recipeToSave, ID).subscribe();
  }

  deleteThis(){
    this.dataService.deleteRecipe(this.recipeID).subscribe();
    this.router.navigateByUrl('/');
  }

}
