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

  constructor(private ingredientenService: IngredientenService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.getCurrentRecept();
    this.getIngredienten();
    this.getBereidwijze();
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
    this.ingredientenService.getIngredienten().subscribe(ingredienten => this.ingredienten = ingredienten);
  }

  getBereidwijze(): void {
    this.ingredientenService.getBereidwijze('Appeltaart').subscribe(bereidwijze => this.bereidwijze = bereidwijze);
  }

  getTimers() {
    this.ingredientenService.getTimers('Appeltaart').subscribe(timer => this.timers = timer);
  }

  addToBoodschappen(){
    //console.log(this.boodschappenlijstComponent.getIngredienten());
  }
}
