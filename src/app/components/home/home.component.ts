import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Recipe } from '../../../Recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[DataService]
})

export class HomeComponent implements OnInit {
  recipes: Recipe[];

  constructor(private dataService: DataService, private router: Router) { 
    this.dataService.getRecipes()
    .subscribe(recipes => {
      this.recipes = recipes;
    })
  }

  onSelect(recipe){
    this.router.navigate(['/recipe', recipe._id]);
  }

  ngOnInit() {
  }

}
