import {Component, OnInit} from '@angular/core';
import {Ingredient} from './ingredienten';
import {IngredientenService} from '../ingredienten.service';
import {bereidwijze} from "../mock-ingredienten";

@Component({
  selector: 'app-ingredienten',
  templateUrl: './ingredienten.component.html',
  styleUrls: ['./ingredienten.component.css']
})
export class IngredientenComponent implements OnInit {

  ingredienten: Ingredient[];
  bereidwijze: string;

  constructor(private ingredientenService: IngredientenService) {
  }

  ngOnInit(): void {
    this.getIngredienten();
    this.getBereidwijze();
  }

  getIngredienten(): void {
    this.ingredientenService.getIngredienten().subscribe(ingredienten => this.ingredienten = ingredienten);
  }

  getBereidwijze(): void {
    this.ingredientenService.getBereidwijze().subscribe(bereidwijze => this.bereidwijze = bereidwijze);
  }
}
