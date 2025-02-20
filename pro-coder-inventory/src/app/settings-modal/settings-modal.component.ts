import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-settings-modal',
  standalone:false,
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.css'
})
export class SettingsModalComponent {
  constructor(public bsModalRef: BsModalRef) {}

  saveChanges() {
    // Add logic to save changes here
    this.bsModalRef.hide();
  }
}
