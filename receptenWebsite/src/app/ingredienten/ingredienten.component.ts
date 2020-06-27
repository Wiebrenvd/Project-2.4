import {Component, OnInit} from '@angular/core';
import {Ingredient} from './ingredienten';
import {ConfigService} from '../config.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-ingredienten',
  templateUrl: './ingredienten.component.html',
  styleUrls: ['./ingredienten.component.css']
})
export class IngredientenComponent implements OnInit {
  selectedIngredients: Ingredient[];
  allIngredients: Ingredient[];

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.allIngredients = [];
    this.selectedIngredients = [];


    this.configService.fetchIngredients().subscribe(
      res => this.addIngredients(res),
      error => console.log(error.message));

  }

  addIngredient(ingredient: NgModel, amount: NgModel) {
    if (!ingredient.value) {
      return;
    }
    let amountValue;
    if (!amount.value) {
      amountValue = 1;
    } else {
      amountValue = amount.value;
    }
    ingredient.value.setAmount(amountValue);

    let found = false;

    for (const selectedIngredient of this.selectedIngredients) {
      if (selectedIngredient.id === ingredient.value.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      this.selectedIngredients.push(ingredient.value);
    }
  }

  removeIngredient(ingredient: Ingredient) {
    if (this.selectedIngredients.includes(ingredient)) {
      const index: number = this.selectedIngredients.indexOf(ingredient);
      if (index !== -1) {
        this.selectedIngredients.splice(index, 1);
      }
    }
  }

  getIngredienten() {
    if (this.selectedIngredients.length > 0) {
      return this.selectedIngredients;
    } else {
      throw new Error('Geen ingredienten toegevoegd!');
    }

  }

  private addIngredients(res: any) {

    for (const ingredient of res.ingredients) {
      this.allIngredients.push(new Ingredient(ingredient.id, ingredient.name));
    }

  }
}
