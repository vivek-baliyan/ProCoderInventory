import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggedInUserData } from '../../../../../core/models/user/logged-in-user-data';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserProfileDetails } from '../../../../../core/models/user/user-profile-details';
import { UpdateProfileSettings } from '../../../../../core/models/user/update-profile-settings';

@Component({
  selector: 'app-profile-settings',
  standalone: false,
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css',
})
export class ProfileSettingsComponent implements OnInit {
  @Input({ required: true }) userProfileData!: UserProfileDetails;
  @Input({ required: true }) userObservable!: Observable<LoggedInUserData>;

  @Output() onProfileSettingsUpdate = new EventEmitter<UpdateProfileSettings>();

  userData!: LoggedInUserData;

  profileSettingsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userObservable?.subscribe((userData) => {
      this.userData = userData;
    });

    this.initializeForm();
  }

  initializeForm() {
    this.profileSettingsForm = this.formBuilder.group({
      companyName: new FormControl(this.userProfileData.companyName),
      contactPerson: new FormControl(this.userProfileData.contactPerson),
      websiteUrl: new FormControl(this.userProfileData.websiteUrl),
      streetAddress: new FormControl(this.userProfileData.streetAddress),
      country: new FormControl(this.userProfileData.country),
      state: new FormControl(this.userProfileData.state),
      city: new FormControl(this.userProfileData.city),
      postalCode: new FormControl(this.userProfileData.postalCode),
    });
  }

  onSubmit() {
    if (this.profileSettingsForm.valid) {
      const updatedProfile: UpdateProfileSettings = {
        profileId: this.userProfileData.id,
        userId: this.userData.userId!,
        companyName: this.profileSettingsForm.value.companyName,
        contactPerson: this.profileSettingsForm.value.contactPerson,
        websiteUrl: this.profileSettingsForm.value.websiteUrl,
        streetAddress: this.profileSettingsForm.value.streetAddress,
        postalCode: this.profileSettingsForm.value.postalCode,
        city: this.profileSettingsForm.value.city,
        state: this.profileSettingsForm.value.state,
        country: this.profileSettingsForm.value.country,
      };
      
      this.onProfileSettingsUpdate.emit(updatedProfile);
    }
  }
}
