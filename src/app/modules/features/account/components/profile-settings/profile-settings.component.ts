import { Component, Input, OnInit } from '@angular/core';
import { LoggedInUserData } from '../../../../../core/models/loggedInUserData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-settings',
  standalone: false,
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent implements OnInit {
  @Input({ required: true }) userProfileData: any;
  @Input({ required: true })
  userObservable: Observable<LoggedInUserData | null> | undefined;
  userData: LoggedInUserData | null = null;

  ngOnInit() {
    this.userObservable?.subscribe((userData) => {
      this.userData = userData;
    });
  }
}
