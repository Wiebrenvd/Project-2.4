import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {Timer} from '../timer/timer';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../config.service';

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
    this.name = recipe.name;
    this.description = recipe.desc;
    this.image = recipe.picture;
    for (const ingredient of recipe.ingredients) {
      this.ingredients.push(new Ingredient(ingredient.id, ingredient.name, ingredient.amount));
    }
    for (const timer of recipe.timers) {
      this.timers.push(new Timer(timer.id, timer.seconds));
    }
  }

  addToBoodschappen() {

  }
}
