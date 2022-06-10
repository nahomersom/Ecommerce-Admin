// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpResponse,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, EMPTY, of } from 'rxjs';
// import { SecurityService } from '@core/security/security.service';
// import { tap, catchError } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root',
// })
// export class InterceptorsService {
//   constructor(private securityService: SecurityService
//   ) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
//     const cloned = req.clone({
//       headers: req.headers.set('Authorization', this.securityService.securityObject.key),
//     });

//   return next.handle(cloned).pipe(tap(evt => {
//     if (evt instanceof HttpResponse) {
//       if(evt.body && evt.ok){
//         const body:any = evt;
        
//         this.securityService.securityObject.key = body.key;

//       }

//     }}),catchError((err: any) => {
//     if(err instanceof HttpErrorResponse) {
//       try {

//       } catch(e) {

//       }
//     }

//     return of(err);

//    }));

//   }
  
// }

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SecurityService } from '@core/security/security.service';
import { HttpCancelService } from './HttpCancelService';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {

  constructor(private service: SecurityService,private httpCancelService:HttpCancelService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.service.securityObject) {      
      const cloned = req.clone({ headers: req.headers.set('Authorization', this.service.securityObject.token)});
      return next.handle(cloned).pipe(
        map(response => {
          if (response instanceof HttpResponse) {
            // this.service.securityObject.key = response.body.token
            return  response;
          }
        }),
        takeUntil(this.httpCancelService.onCancelPendingRequests())
      );
    } 

  }
  
}