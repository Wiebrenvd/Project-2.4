import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredienten/ingredienten';

@Component({
  selector: 'app-al-in-huis',
  templateUrl: './al-in-huis.component.html',
  styleUrls: ['./al-in-huis.component.css']
})
export class AlInHuisComponent implements OnInit {

  constructor() { }

  alInHuis: Ingredient[];



  ngOnInit(): void {
  }

}
