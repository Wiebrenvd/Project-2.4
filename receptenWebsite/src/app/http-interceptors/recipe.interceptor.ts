import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {tap} from 'rxjs/operators';

@Injectable()
export class RecipeInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('jwt');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token)
      });
    }


    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body.token != null) {
            console.log('nieuwe token:' + event.body.token);
            localStorage.setItem('jwt', event.body.token);
          }
        }
      }, error => {
        console.error(error);
        if (error.status === 401) {
          this.router.navigate(['inloggen']);
        }


      })
    );
  }
}
