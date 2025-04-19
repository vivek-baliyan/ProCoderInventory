import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  show() {
    this.loadingRequestCount++;
    this.spinnerService.show();
  }

  hide() {
    this.loadingRequestCount--;
    if (this.loadingRequestCount <= 0) {
      this.loadingRequestCount = 0;
      this.spinnerService.hide();
    }
  }

  forceHide() {
    this.loadingRequestCount = 0;
    this.spinnerService.hide();
  }
}