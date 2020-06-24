import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpParams,
  HttpRequest
} from '@angular/common/http';

export interface Recept {
  name: string;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

/*
* na elke subscribe, bij een response, eerst checken naar jwt.
* */
  sendLoginData(email: string, password: string) {
    const params = new HttpParams().set('token', localStorage.getItem('jwt')).set('email', email).set('password', password);
    const responseType = 'text';
    return this.http.get('http://127.0.0.1:3000/login', {responseType, params});

  }

  sendSearch(searchString: string) {
    const params = new HttpParams().set('token', localStorage.getItem('jwt')).set('searchString', searchString);
    return this.http.get('http://127.0.0.1:3000/zoek', {params});
  }


  sendRecipeFetch(id: string) {
    const params = new HttpParams().set('token', localStorage.getItem('jwt'));
    return this.http.get(`http://127.0.0.1:3000/recept/${id}`, {params});
  }
}
