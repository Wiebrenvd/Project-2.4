import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredienten/ingredienten';

@Component({
  selector: 'app-al-in-huis',
  templateUrl: './al-in-huis.component.html',
  styleUrls: ['./al-in-huis.component.css']
})
export class AlInHuisComponent implements OnInit {
  alInHuis: Ingredient[];
  submitted = false;

  constructor() { }
  ngOnInit(): void {
  }


  onSubmit(){ this.submitted = true; }

  verwijderen(name): void{
    let i = 0;
    let ingredient: Ingredient;
    for (ingredient of this.alInHuis){
      if (ingredient.name === name){
        this.alInHuis.splice(i, 1);
      }
      i++;
    }
  }

  toevoegen(name, amount): void{
    // this.alInHuis.push(new Ingredient(name.value, amount.value));
    console.log('test');
  }

}
