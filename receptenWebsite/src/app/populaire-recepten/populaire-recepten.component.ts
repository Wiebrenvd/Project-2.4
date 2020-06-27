import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Ingredient} from '../ingredienten/ingredienten';
import {Recept} from './recept';

@Component({
  selector: 'app-populaire-recepten',
  templateUrl: './populaire-recepten.component.html',
  styleUrls: ['./populaire-recepten.component.css']
})
export class PopulaireReceptenComponent implements OnInit {
  popularRecipes: Recept[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.popularRecipes = [];
    this.popularRecipes.push(new Recept(1, 'Rijst'));
    this.popularRecipes.push(new Recept(2, 'Kip'));
    this.popularRecipes.push(new Recept(3, 'Spaghetti'));
  }

  submit(recipe: number) {
    this.router.navigate(['recept', recipe]);
  }

}
