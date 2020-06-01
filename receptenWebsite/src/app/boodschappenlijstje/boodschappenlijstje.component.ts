import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredienten/ingredienten';
import { IngredientenService } from '../ingredienten.service';

@Component({
  selector: 'app-boodschappenlijstje',
  templateUrl: './boodschappenlijstje.component.html',
  styleUrls: ['./boodschappenlijstje.component.css']
})
export class BoodschappenlijstjeComponent implements OnInit {

  boodschappenlijstje: Ingredient[];
  constructor(private ingredientenService: IngredientenService) { }
  ngOnInit(): void {
    this.getIngredienten();
  }

  getIngredienten(): void{
    this.ingredientenService.getIngredienten().subscribe(ingredienten => this.boodschappenlijstje = ingredienten);
  }

}
