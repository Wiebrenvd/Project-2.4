import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-populaire-recepten',
  templateUrl: './populaire-recepten.component.html',
  styleUrls: ['./populaire-recepten.component.css']
})
export class PopulaireReceptenComponent implements OnInit {
  popularRecipes: string[];
  private id: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.popularRecipes = ['Rijst', 'Kip', 'Spaghetti'];
  }

  submit(recipe: string) {

    this.id = '1';
    this.router.navigate(['recept', this.id]);
  }

}
