import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'recipe/:recipeID', component: RecipeComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);