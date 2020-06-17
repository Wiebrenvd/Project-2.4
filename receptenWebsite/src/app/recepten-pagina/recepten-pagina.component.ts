import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {IngredientenService} from '../ingredienten.service';
import {Timer} from '../timer/timer';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recepten-pagina',
  templateUrl: './recepten-pagina.component.html',
  styleUrls: ['./recepten-pagina.component.css']
})
export class ReceptenPaginaComponent implements OnInit {

  ingredienten: Ingredient[];
  bereidwijze: string;
  timers: Timer[];
  currentRecept: string;
  receptID: number;
  image: any;

  constructor(private ingredientenService: IngredientenService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.getCurrentRecept();
    this.getIngredienten();
    this.getBereidwijze();
    this.getReceptImage();
    this.getTimers();
  }

  getCurrentRecept(): void{
    this.activatedRoute.queryParams.subscribe(params => {
      const currentrecept = params['currentrecept'];
      this.currentRecept = currentrecept;
      //this.receptID = SELECT * FROM mydb.recipe WHERE recipeName = currentrecept;
    });
  }

  getIngredienten(): void {
    //SELECT * FROM mydb.recipeingredients WHERE idRecipe = receptID;
    this.ingredientenService.getIngredienten().subscribe(ingredienten => this.ingredienten = ingredienten);
  }

  getBereidwijze(): void {
    //SELECT * FROM mydb.preparationmethod WHERE fk_idRecipe = receptID;
    this.ingredientenService.getBereidwijze('Appeltaart').subscribe(bereidwijze => this.bereidwijze = bereidwijze);
  }
  getReceptImage(): void {
    this.image = 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/72912_992-0-4311-4311.jpg';
    //this.image = SELECT Image FROM mydb.recipeingredients WHERE idRecipe = receptID;
  }

  getTimers() {
    //SELECT CookTime FROM mydb.recipe WHERE idRecipe = receptID;
    this.ingredientenService.getTimers('Appeltaart').subscribe(timer => this.timers = timer);
  }

  addToBoodschappen(){
    //console.log(this.boodschappenlijstComponent.getIngredienten());
  }
}
