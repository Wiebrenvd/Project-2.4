import { Injectable } from '@angular/core';
import { Ingredient } from './ingredienten/ingredienten';
import {bereidwijze, ingredienten, timers} from './mock-ingredienten';
import {Observable, of, timer} from 'rxjs';
import {Timer} from './timer/timer';

@Injectable({
  providedIn: 'root'
})
export class IngredientenService {

  constructor() { }

  getIngredienten(): Observable<Ingredient[]> {
    return of (ingredienten);
  }
  getBereidwijze(name: string): Observable<string>{
    const text = bereidwijze.find((s) => s.name === name).text;
    return of (text);
  }

  getTimers(id: string): Observable<Timer[]> {
    return of (timers);
  }
}
