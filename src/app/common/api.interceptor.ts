import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private configService: ConfigService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status != 200) {
          this.configService.notify('error', 'Unknown errror occured, Try again later');
        } 
        return throwError(() => err)
      })
    ) as Observable<HttpEvent<any>>;
  }

}
