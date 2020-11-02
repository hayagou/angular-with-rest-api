import { DialogService } from './../dialog/dialog.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiResponseSingle } from "src/app/model/common/ApiResponseSingle";
import { ApiValidationService } from "./common/api-validation.service";
@Injectable({
  providedIn: 'root'
})
export class SignService {

  private signInUrl = "/api/v1/signin";
  private signUpurl = "/api/v1/signup";
  
  constructor(private http: HttpClient, 
    private apiValidationService: ApiValidationService,
    private dialogService: DialogService) {
    
   }

  signIn(id: string, password: string): Promise<any>{
    const params = new FormData();
    params.append("id", id);
    params.append("password", password);
    return this.http.post<ApiResponseSingle>(this.signInUrl, params).toPromise().then(Response =>{
      localStorage.setItem("x-auth-token", Response.data);
    }).catch(Response=> {
      // alert('[로그인 실패\n'+ Response.error.msg);
      this.dialogService.alert('로그인 실패', Response.error.msg)
       return Promise.reject(Response.error.msg);
    });
  }

  signUp(id: string, password: string, name: string): Promise<any>{
    const params = new FormData();
    params.append('id', id);
    params.append('password', password);
    params.append('name', name);

    return this.http.post<ApiResponseSingle>(this.signUpurl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(Response =>{
        return true;
      })
      .catch(Response =>{
        // alert('[가입 실패\n' + Response.console.error.msg);
        this.dialogService.alert('회원 가입중 오류 발생', Response.error.msg)
        return Promise.reject(Response.error.msg)
      })
  }

  isSignIn(): boolean{
    const token = localStorage.getItem("x-auth-token");
    if(token){
      return true;
    }else{
      return false;
    }
  }
}
