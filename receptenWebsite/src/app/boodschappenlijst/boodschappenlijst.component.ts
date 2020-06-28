import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {ConfigService} from '../config.service';
import {NgModel} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-boodschappenlijst',
  templateUrl: './boodschappenlijst.component.html',
  styleUrls: ['./boodschappenlijst.component.css']
})
export class BoodschappenlijstComponent implements OnInit {

  boodschappenlijst: Ingredient[];

  listofRecept: Ingredient[];

  allIngredients: Ingredient[];

  constructor(private route: ActivatedRoute, private router: Router, private configService: ConfigService) {
  }

  ngOnInit(): void {


    this.listofRecept = [];
    this.boodschappenlijst = [];
    this.allIngredients = [];

    let params = this.route.snapshot.params;
    console.log(params);
    if (params === undefined) {
    } else {
      console.log('excuted');
      this.receptToevoegen(params.ing);
      params = null;
    }

    this.configService.fetchBoodschappenlijst().subscribe(
      res => this.createResultViews(res),
      error => console.log(error.message));

    this.configService.fetchIngredients().subscribe(
      res => this.addIngredients(res),
      error => console.log(error.message));



  }

  receptToevoegen(ingredientString: string) {
    if (ingredientString === undefined) {
      // do nothing
    } else {
      if (ingredientString.substring(ingredientString.length - 1) === '/') {
        ingredientString = ingredientString.substring(0, ingredientString.length - 1);
      }
      const listOfIngredients = ingredientString.split('/');
      for (const ing of listOfIngredients) {
        // console.log(ing);
        const item = ing.split(':');
        this.listofRecept.push(new Ingredient(0, item[0], item[1]));
      }

      this.configService.sendBoodschappenlijstRecept(this.listofRecept).subscribe(
        res => null,
        error => console.log(error.message));
    }
  }


  verwijderen(id): void {
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
    for (const responseIngredient of response.ingredients) {
      const ingredient = new Ingredient(responseIngredient.id, responseIngredient.name, responseIngredient.amount);
      this.boodschappenlijst.push(ingredient);
    }

  }

  private addView(response: any) {
    console.log(response);
    const ingredient = new Ingredient(response.ingredientId, response.ingredientName, response.ingredientAmount);
    this.boodschappenlijst.push(ingredient);
  }


  private deleteView(res: any) {

    let ingredient: Ingredient;
    let i = 0;

    for (ingredient of this.boodschappenlijst) {
      if (ingredient.id === parseInt(res.id, 10)) {
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
