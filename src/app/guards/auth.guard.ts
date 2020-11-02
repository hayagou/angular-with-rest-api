import { SignService } from 'src/app/service/rest-api/sign.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private signService: SignService){
      
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.signService.isSignIn()){
        return true;
      }else{
        this.router.navigate(['/signin'], {queryParams: { redirectTo: state.url}});
        return false;
      }
  }
  
}
