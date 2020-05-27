import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recept-van-de-dag',
  templateUrl: './recept-van-de-dag.component.html',
  styleUrls: ['./recept-van-de-dag.component.css']
})
export class ReceptVanDeDagComponent implements OnInit {
  recipeName: string;
  recipeDesc: string;

  constructor() {
  }

  ngOnInit(): void {
    this.recipeName = 'Tosti'; // TODO verander naar database.getRecipeOfTheDay();
    this.recipeDesc = 'Verwarm eerst het tostiijzer, daarna pleur je wat kaas en ham op je brood en werp je hem in het ijzer.';
  }

}
