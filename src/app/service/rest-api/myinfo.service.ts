import { Injectable } from '@angular/core';
import { ApiResponseSingle } from "src/app/model/common/ApiResponseSingle";
import { ApiValidationService } from "./common/api-validation.service";
import { User } from "src/app/model/myinfo/User";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class MyinfoService {

  constructor(
    private http : HttpClient,
    private apiValidationService: ApiValidationService
  ) { }

  private getUserUrl = "api/v1/user";

  getUser(): Promise<User>{
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if(loginUser == null){
      return this.http.get<ApiResponseSingle>(this.getUserUrl)
        .toPromise().then(this.apiValidationService.validateResponse)
        .then(Response =>{
          localStorage.setItem("loginUser",JSON.stringify(Response.data));
          return Response.data as User;
        })
        .catch(Response =>{
          localStorage.removeItem("x-auth-token");
          alert("[회원 정보 조회중 오류 발생]\n" + Response.error.msg);
          return Promise.reject(Response.error.msg);
        
        });
    }else{
      return Promise.resolve(loginUser);
    }
  }
}
