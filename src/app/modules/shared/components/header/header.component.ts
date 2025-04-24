import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { LoggedInUserData } from '../../../../core/models/user/logged-in-user-data';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userData: LoggedInUserData | null = null;

  modalRef?: BsModalRef;
  config = {
    animated: true,
  };
  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to user data
    this.authService.currentUser$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  onSignout() {
    this.authService.signout();
    this.router.navigate(['/auth/signin']);
  }

  openSettingsModal() {
    this.modalRef = this.modalService.show(SettingsModalComponent, {
      class: 'modal-sm modal-dialog-right', // Optional: Customize modal size and position
      animated: true,
      backdrop: true, // Click outside to close
      keyboard: true, // Esc key to close
    });
  }
}
