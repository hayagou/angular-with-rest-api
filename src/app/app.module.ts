import { LoadingSpinnerService } from './service/loading-spinner/loading-spinner.service';
import { BoardResolve } from './component/board/resolve/board-resolve';
import { BoardService } from './service/rest-api/board.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HomeComponent } from './component/home.component';
import { SigninComponent } from './component/member/signin/signin.component';
import { SignupComponent } from './component/member/signup/signup.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { SignService } from "./service/rest-api/sign.service";
import { LogoutComponent } from './component/logout/logout.component';
import { MyinfoComponent } from './component/member/myinfo/myinfo.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequestInterceptorService } from "./service/rest-api/common/http-request-interceptor.service";
import { MyinfoService } from './service/rest-api/myinfo.service';
import { BoardComponent } from './component/board/board.component';
import { PostComponent } from './component/board/post.component';
import { PostViewComponent } from './component/board/post-view.component';
import { PostModifyComponent } from './component/board/post-modify.component';
import { AlertDialogComponent } from './component/common/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './component/common/confirm-dialog/confirm-dialog.component';
import { Error404Component } from './component/error/error404.component';
import { LoadingSpinnerComponent } from './component/common/loading-spinner/loading-spinner.component';
import { LoadingSpinnerOverlayComponent } from './component/common/loading-spinner/loading-spinner-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    MyinfoComponent,
    BoardComponent,
    PostComponent,
    PostViewComponent,
    PostModifyComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    Error404Component,
    LoadingSpinnerComponent,
    LoadingSpinnerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SignService,
    MyinfoService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptorService,
    multi: true,
    },
    BoardService,
    BoardResolve,
    LoadingSpinnerService
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerOverlayComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
