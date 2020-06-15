import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recepten-in-huis',
  templateUrl: './recepten-in-huis.component.html',
  styleUrls: ['./recepten-in-huis.component.css']
})
export class ReceptenInHuisComponent implements OnInit {
  recipes: string[];

  constructor() {}

  ngOnInit(): void {
    this.recipes = ['Rijst', 'Kip', 'Spaghetti'];
  }

}
