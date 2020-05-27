import { Component, OnInit } from '@angular/core';
import {Ingredient} from "./ingredienten";

@Component({
  selector: 'app-ingredienten',
  templateUrl: './ingredienten.component.html',
  styleUrls: ['./ingredienten.component.css']
})
export class IngredientenComponent implements OnInit {
  ingredienten = [
    new Ingredient('Appels', '700g'),
    new Ingredient('Bloem', '500g'),
    new Ingredient('boter', '400g'),
    new Ingredient('eiren', '2')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
