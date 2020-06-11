import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../ingredienten/ingredienten';
import {IngredientenService} from '../ingredienten.service';
import {Timer} from '../timer/timer';

@Component({
  selector: 'app-recepten-pagina',
  templateUrl: './recepten-pagina.component.html',
  styleUrls: ['./recepten-pagina.component.css']
})
export class ReceptenPaginaComponent implements OnInit {

  ingredienten: Ingredient[];
  bereidwijze: string;
  timers: Timer[];

  constructor(private ingredientenService: IngredientenService) {
  }

  ngOnInit(): void {
    this.getIngredienten();
    this.getBereidwijze();
    this.getTimers();
    console.log();
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
