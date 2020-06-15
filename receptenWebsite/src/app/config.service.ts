import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {catchError, retry} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Recept {
  name: string;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  getAlleRecepten(): Observable<Recept[]> {
    return this.http.get<Recept[]>('http://localhost:4300/recept');
  }

  getRecept(name: string): Observable<Recept> {
    return this.http.get<Recept>('http://localhost:4200/recept' + name);
  }

  addRecept(recept: Recept): Observable<Recept> {
    return this.http.post<Recept>('http://localhost:4200/receptDelen', recept);
  }

  updateRecept(recept: Recept): Observable<void> {
    return this.http.put<void>(
      'http://localhost:4200/recept' + recept.name,
      recept
    );
  }

  deleteReceot(name: string) {
    return this.http.delete('http://localhost:8000/api/cats/' + name);
  }
}
