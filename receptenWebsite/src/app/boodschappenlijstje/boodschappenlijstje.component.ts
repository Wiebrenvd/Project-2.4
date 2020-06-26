import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {ConfigService} from '../config.service';
import {NgModel} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-boodschappenlijstje',
  templateUrl: './boodschappenlijstje.component.html',
  styleUrls: ['./boodschappenlijstje.component.css']
})
export class BoodschappenlijstjeComponent implements OnInit {

  boodschappenlijstje: Ingredient[];

  allIngredients: Ingredient[];

  constructor(private router: Router, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.boodschappenlijstje = [];
    this.allIngredients = [];
    this.configService.fetchBoodschappenlijst().subscribe(
      res => this.createResultViews(res),
      error => console.log(error.message));

    this.configService.fetchIngredients().subscribe(
      res => this.addIngredients(res),
      error => console.log(error.message));

  }


  verwijderen(id): void {
    console.log(id);
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
    for (const ingredient of response.ingredients) {
      this.boodschappenlijstje.push(new Ingredient(ingredient.id, ingredient.name, ingredient.amount));
    }

  }

  private addView(response: any) {
    this.boodschappenlijstje.push(new Ingredient(response.ingredientId, response.ingredientName, response.ingredientAmount));
  }


  private deleteView(res: any) {
    console.log(res.id);

    let ingredient: Ingredient;
    let i = 0;

    for (ingredient of this.boodschappenlijstje) {
      if (ingredient.id === parseInt(res.id, 10)) {
        console.log(`is ${ingredient.id} -> ${res.id} ?`);
        this.boodschappenlijstje.splice(i, 1);
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
