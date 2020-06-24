import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent implements OnInit {

  public id: number;
  public title: string;
  public desc: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectRecipe() {
    this.router.navigate(['recept', this.id]);
  }
}
