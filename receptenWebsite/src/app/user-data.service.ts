import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { inHuis } from './mock-userData';
import { Ingredient} from './ingredienten/ingredienten';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }
  getInHuis(): Observable<Ingredient[]> {
    return of(inHuis);
  }
}
