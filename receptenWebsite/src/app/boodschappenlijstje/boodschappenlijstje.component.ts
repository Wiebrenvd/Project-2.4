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

  verwijderen(name): void{
    let i = 0;
    let ingredient: Ingredient;
    for (ingredient of this.boodschappenlijstje){
      if (ingredient.name === name){
        this.boodschappenlijstje.splice(i, 1);
      }
      i++;
    }
  }

  toevoegen(name, amount): void{
    this.boodschappenlijstje.push(new Ingredient(name.value, amount.value));
    // console.log(alInHuisForm);
    console.log('test');
  }

}
