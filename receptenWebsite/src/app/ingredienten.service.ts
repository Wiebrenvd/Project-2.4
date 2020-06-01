import { Injectable } from '@angular/core';
import { Ingredient } from './ingredienten/ingredienten';
import {bereidwijze, ingredienten} from './mock-ingredienten';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientenService {

  constructor() { }
  getIngredienten(): Observable<Ingredient[]> {
    return of (ingredienten);
  }
  getBereidwijze(name): Observable<string>{
    const text = bereidwijze.find(name).name;
    return of (text);
  }
}
