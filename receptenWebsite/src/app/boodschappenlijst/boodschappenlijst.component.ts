import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {ConfigService} from '../config.service';
import {NgModel} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boodschappenlijst',
  templateUrl: './boodschappenlijst.component.html',
  styleUrls: ['./boodschappenlijst.component.css']
})
export class BoodschappenlijstComponent implements OnInit {

  boodschappenlijst: Ingredient[];

  allIngredients: Ingredient[];

  constructor(private router: Router, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.boodschappenlijst = [];
    this.allIngredients = [];
    this.configService.fetchBoodschappenlijst().subscribe(
      res => this.createResultViews(res),
      error => console.log(error.message));

    this.configService.fetchIngredients().subscribe(
      res => this.addIngredients(res),
      error => console.log(error.message));

  }


  verwijderen(id): void {
    console.log(this.boodschappenlijst);
    this.configService.deleteBoodschappenlijst(id).subscribe(
      res => this.deleteView(res),
      error => console.log(error.message));

  }

  toevoegen(name: NgModel, amount: NgModel): void {
    this.configService.sendBoodschappenlijst(name.value, amount.value).subscribe(
      res => this.addView(res),
      error => console.log(error.message));
  }

  private createResultViews(response: any) {
    console.log(response);
    for (const responseIngredient of response.ingredients) {
      const ingredient = new Ingredient(responseIngredient.id, responseIngredient.name);
      ingredient.setAmount(responseIngredient.amount);
      this.boodschappenlijst.push(ingredient);
    }

  }

  private addView(response: any) {
    const ingredient = new Ingredient(response.ingredientId, response.ingredientName);
    ingredient.setAmount(response.ingredientAmount);
    this.boodschappenlijst.push(ingredient);
  }


  private deleteView(res: any) {
    console.log(res.id);

    let ingredient: Ingredient;
    let i = 0;

    for (ingredient of this.boodschappenlijst) {
      if (ingredient.id === parseInt(res.id, 10)) {
        console.log(`is ${ingredient.id} -> ${res.id} ?`);
        this.boodschappenlijst.splice(i, 1);
        break;
      }
      i++;
    }

  }

  private addIngredients(res: any) {
    for (const ingredient of res.ingredients) {
      this.allIngredients.push(ingredient.name);
    }

  }
}
