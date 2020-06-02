import { Component, OnInit } from '@angular/core';
import {IngredientenService} from '../ingredienten.service';
import {Ingredient} from "../ingredienten/ingredienten";

@Component({
  selector: 'app-ingredienten-service',
  templateUrl: './ingredienten-service.component.html',
  styleUrls: ['./ingredienten-service.component.css']
})
export class IngredientenServiceComponent implements OnInit {

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
    this.ingredientenService.getBereidwijze('Appeltaart').subscribe(bereidwijze => this.bereidwijze = bereidwijze);
  }

}
