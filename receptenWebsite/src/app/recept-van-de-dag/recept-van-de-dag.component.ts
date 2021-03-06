import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../config.service";
import {Recept} from "../populaire-recepten/recept";

@Component({
  selector: 'app-recept-van-de-dag',
  templateUrl: './recept-van-de-dag.component.html',
  styleUrls: ['./recept-van-de-dag.component.css']
})
export class ReceptVanDeDagComponent implements OnInit {
  recipeName: string;
  recipeDesc: string;
  recipeImg: string;
  seed: number;
  recipeId: any;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.fetchTotalRecipesIDs().subscribe(
      res => this.pickRecipe(res),
      error => console.error(error.message));
  }

  private pickRecipe(res: any) {
    const idArray = [];
    for (const recipe of res.recipes) {
      idArray.push(recipe.id);
    }
    const date = new Date();
    this.seed = date.getFullYear() + date.getMonth() + date.getDate();

    const x = Math.sin(this.seed++) * 10000;
    let random = x - Math.floor(x);
    random = Math.round(random * 10);
    if (idArray.includes(random)) {
      this.configService.sendRecipeFetch(random.toString()).subscribe(
        res2 => this.createView(res2),
        error => console.log(error.message));
    } else {
      random = idArray[Math.floor(Math.random() * idArray.length)];
      this.configService.sendRecipeFetch(random.toString()).subscribe(
        res2 => this.createView(res2),
        error => console.log(error.message));
    }
  }

  createView(res: any) {
    this.recipeName = res.name;
    this.recipeDesc = res.desc;
    this.recipeId = res.id;
    if (res.image) {
      this.recipeImg = res.image;
    } else {
      this.recipeImg = 'assets/placeholder.jpg';
    }

  }
}
