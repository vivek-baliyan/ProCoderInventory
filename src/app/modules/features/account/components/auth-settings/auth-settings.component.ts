import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInUserData } from '../../../../../core/models/loggedInUserData';

@Component({
  selector: 'app-auth-settings',
  standalone: false,
  templateUrl: './auth-settings.component.html',
  styleUrl: './auth-settings.component.css',
})
export class AuthSettingsComponent implements OnInit {
  @Input({ required: true })
  userObservable: Observable<LoggedInUserData | null> | undefined;
  userData: LoggedInUserData | null = null;

  ngOnInit() {
    this.userObservable?.subscribe((userData) => {
      this.userData = userData;
    });
  }
}
