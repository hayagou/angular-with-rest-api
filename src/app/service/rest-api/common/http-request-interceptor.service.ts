import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { HttpEvent } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    var token = localStorage.getItem("x-auth-token");
    var reqHeader: HttpHeaders = req.headers;
    if(token)
      reqHeader = reqHeader.set("x-auth-token", token);
    const newRequest = req.clone({headers: reqHeader});
    return next.handle(newRequest);
  }
}
