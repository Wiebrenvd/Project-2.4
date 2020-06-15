import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-populaire-recepten',
  templateUrl: './populaire-recepten.component.html',
  styleUrls: ['./populaire-recepten.component.css']
})
export class PopulaireReceptenComponent implements OnInit {
  popularRecipes: string[];

  constructor() { }

  ngOnInit(): void {
    this.popularRecipes = ['Rijst', 'Kip', 'Spaghetti'];
  }

}
