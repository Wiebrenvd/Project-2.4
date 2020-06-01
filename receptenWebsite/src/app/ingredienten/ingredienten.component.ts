import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingredienten',
  templateUrl: './ingredienten.component.html',
  styleUrls: ['./ingredienten.component.css']
})
export class IngredientenComponent implements OnInit {
  ingredients: string[];
  allIngredients: string[];

  constructor() {
  }

  ngOnInit(): void {
    this.ingredients = [];
    this.allIngredients = ['Kaas', 'Ham', 'Ei']; // TODO database


  }

  addIngredient(ingredient: string) {
    if (!this.ingredients.includes(ingredient) && ingredient.length > 0) {
      this.ingredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: string) {
    if (this.ingredients.includes(ingredient)) {
      const index: number = this.ingredients.indexOf(ingredient);
      if (index !== -1) {
        this.ingredients.splice(index, 1);
      }
    }
  }

  getIngredienten() {
    if (this.ingredients.length > 0) {
      return this.ingredients;
    } else {
      throw new Error('Geen ingredienten toegevoegd!');
    }

  }
}
