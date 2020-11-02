import { LoadingSpinnerService } from './service/loading-spinner/loading-spinner.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

import { Component } from '@angular/core';
import { SignService } from "./service/rest-api/sign.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-website';
  constructor(
    public signService: SignService,
    private router: Router,
    private loadingSpinnerService: LoadingSpinnerService
  ){
    router.events.subscribe((event: RouterEvent) => {
      this.updateLoadingSpinner(event);
    })

  }

  private updateLoadingSpinner(event: RouterEvent): void{
    if(event instanceof NavigationStart){
      console.log("NavigationStart");
      this.loadingSpinnerService.show();
    }

    if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
      console.log("NavigationEnd");
      this.loadingSpinnerService.hide();
    }
  }
}
