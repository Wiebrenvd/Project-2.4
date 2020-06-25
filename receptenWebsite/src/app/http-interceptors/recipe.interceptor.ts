import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class RecipeInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Als een token is gestuurd, sla hem op.
    if (req.params.get('token') != null) {
      localStorage.setItem('jwt', req.params.get('token'));
    }


    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) { // Authenticatie error -> naar inlog scherm voor nieuw token
          this.router.navigate(['inloggen']);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
