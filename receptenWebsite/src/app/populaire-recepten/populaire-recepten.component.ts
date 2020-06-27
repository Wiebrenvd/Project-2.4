import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ingredient} from '../ingredienten/ingredienten';
import {Recept} from './recept';
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-populaire-recepten',
  templateUrl: './populaire-recepten.component.html',
  styleUrls: ['./populaire-recepten.component.css']
})
export class PopulaireReceptenComponent implements OnInit {
  popularRecipes: Recept[];

  constructor(private router: Router, private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.popularRecipes = [];
    this.configService.fetchPopularRecipes().subscribe(
      res => this.addRecipes(res),
      error => console.error(error.message));
  }

  submit(recipe: number) {
    this.router.navigate(['recept', recipe]);
  }

  private addRecipes(res: any) {
    for (const recipe of res.recipes) {
      const recept = new Recept(recipe.id, recipe.name);
      recept.setClicks(recipe.clicks);
      this.popularRecipes.push(recept);
    }
  }
}
