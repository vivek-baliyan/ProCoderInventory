import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  modalRef?: BsModalRef;
  config = {
    animated: true,
  };
  constructor(private modalService: BsModalService) {}

  openSettingsModal() {
    this.modalRef = this.modalService.show(SettingsModalComponent, {
      class: 'modal-sm modal-dialog-right', // Optional: Customize modal size and position
      animated: true,
      backdrop: true, // Click outside to close
      keyboard: true, // Esc key to close
    });
  }
}
