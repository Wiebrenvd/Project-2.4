import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {Ingredient} from './ingredienten/ingredienten';

import * as jwt_decode from 'jwt-decode';

export interface Recept {
  name: string;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {
  }

  sendLoginData(email: string, password: string) {
    // const params = new HttpParams().set('email', email).set('password', password);
    const params = {
      email: undefined,
      password: undefined
    };
    params.email = email;
    params.password = password;
    return this.http.post('http://127.0.0.1:3000/login', params);

  }

  sendSearch(searchString: string) {
    const params = new HttpParams().set('searchString', searchString);
    return this.http.get('http://127.0.0.1:3000/zoek', {params});
  }


  sendRecipeFetch(id: string) {
    const params = new HttpParams();
    return this.http.get(`http://127.0.0.1:3000/recept/${id}`, {params});
  }

  fetchBoodschappenlijst() {
    const params = new HttpParams();
    return this.http.get(`http://127.0.0.1:3000/boodschappenlijstje`, {params});
  }

  deleteBoodschappenlijst(id: any) {
    //const params = new HttpParams();
    const params = {
      listofIngredients: undefined
    };
    params.listofIngredients = id;
    return this.http.delete(`http://127.0.0.1:3000/boodschappenlijstje/${id}`, {params});
  }

  sendBoodschappenlijst(ingredientName: string, amount: string) {
    const params = new HttpParams().set('ingredientName', ingredientName).set('ingredientAmount', amount);
    return this.http.put('http://127.0.0.1:3000/boodschappenlijstje', {params});
  }

  sendBoodschappenlijstRecept(receptString: any) {
    const params = new HttpParams().set('list', receptString);
    return this.http.put('http://127.0.0.1:3000/boodschappenlijstje', {params});
  }

  fetchIngredients() {
    const params = new HttpParams();
    return this.http.get('http://127.0.0.1:3000/ingredients', {params});
  }


  register(username: string, email: string, password: string) {
    //const params = new HttpParams().set('username', username).set('email', email).set('password', password);
    const params = {
      username: undefined,
      email: undefined,
      password: undefined
    };
    params.username = username;
    params.email = email;
    params.password = password;
    return this.http.post('http://127.0.0.1:3000/register', params);
  }

  verifyJWT() {
    const params = new HttpParams();
    return this.http.get('http://127.0.0.1:3000/verify', {params});
  }

  fetchPopularRecipes() {
    const params = new HttpParams();
    return this.http.get('http://127.0.0.1:3000/popular', {params});
  }

  fetchTotalRecipesIDs() {
    const params = new HttpParams();
    return this.http.get('http://127.0.0.1:3000/receptofday', {params});
  }

  sendNewRecipe(name: any, bereidingswijze: any, ingredienten: any, timers: any, image: any) {
    const params = new HttpParams().set('name', name).set('desc', bereidingswijze).set('ingredients', ingredienten).set('timers', timers).set('image', image);
    return this.http.post('http://127.0.0.1:3000/upload', {params});
  }
}
