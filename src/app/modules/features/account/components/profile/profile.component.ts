import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInUserData } from '../../../../../core/models/loggedInUserData';
import { UserProfileDetails } from '../../../../../core/models/userProfileDetails';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @Input({ required: true }) userProfileData: UserProfileDetails | null = null;

  ngOnInit() {}

  get getUserAge(): number {
    const birthDateObj = new Date(this.userProfileData?.dateOfBirth!);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }
}
