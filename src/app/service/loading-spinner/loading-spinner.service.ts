import { LoadingSpinnerOverlayComponent } from './../../component/common/loading-spinner/loading-spinner-overlay.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private overlayRef: OverlayRef = null;
  
  constructor(private overlay: Overlay) { }

  public show(){
    if(!this.overlayRef){
      this.overlayRef = this.overlay.create();
    }

    const spinnerOverlayPortal = new ComponentPortal(LoadingSpinnerOverlayComponent);
    this.overlayRef.attach(spinnerOverlayPortal);
  }

  public hide(){
    if(!!this.overlayRef){
      this.overlayRef.detach();
    }
  }
}
