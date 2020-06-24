import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {IngredientenService} from '../ingredienten.service';
import {Timer} from '../timer/timer';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-recepten-pagina',
  templateUrl: './recepten-pagina.component.html',
  styleUrls: ['./recepten-pagina.component.css']
})
export class ReceptenPaginaComponent implements OnInit {

  ingredients: Ingredient[];
  timers: Timer[];
  image: any;
  private id: string;
  name: string;
  description: any;

  constructor(private configService: ConfigService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ingredients = [];
    this.timers = [];
    this.id = this.route.snapshot.paramMap.get('id');

    this.configService.sendRecipeFetch(this.id).subscribe(
      res => this.createViews(res),
      error => console.log(error.message));

  }

  private createViews(recipe: any) {
    if (recipe.token) {
      localStorage.setItem('jwt', recipe.token);
    }
    this.name = recipe.name;
    this.description = recipe.desc;
    for (const ingredient of recipe.ingredients) {
      console.log(ingredient);
      this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
    this.image = recipe.picture;
  }

  addToBoodschappen() {

  }
}
