import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UserProfileDetails } from '../../../../../core/models/user-profile-details';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateProfile } from '../../../../../core/models/update-profile';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @ViewChild('editProfileModal') editProfileModal!: TemplateRef<any>;

  @Input({ required: true }) userProfileData!: UserProfileDetails;
  @Output() onProfileUpdate = new EventEmitter<UpdateProfile>();

  modalRef?: BsModalRef;

  editProfileForm!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.editProfileForm = this.formBuilder.group({
      firstName: [this.userProfileData.firstName],
      lastName: [this.userProfileData.lastName],
      profileImage: [this.userProfileData.profileImageUrl],
      bio: [this.userProfileData.bio],
      phone: [this.userProfileData.phoneNumber],
      dateOfBirth: [this.userProfileData.dateOfBirth],
    });
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      var formData = this.editProfileForm.value;

      const updatProfile: UpdateProfile = {
        profileId: this.userProfileData.id,
        userId: this.userProfileData.userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profileImageUrl: formData.profileImage,
        bio: formData.bio,
        phoneNumber: formData.phone,
        dateOfBirth: formData.dateOfBirth,
      };

      this.onProfileUpdate.emit(updatProfile);
    }
  }
  get getUserAge(): number {
    const birthDateObj = new Date(this.userProfileData.dateOfBirth!);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  }

  openModal() {
    this.modalRef = this.modalService.show(this.editProfileModal, {
      class:
        'modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable',
      backdrop: 'static',
      animated: true,
      keyboard: false,
    });
  }

  closeModal(): void {
    this.modalRef?.hide();
  }
}
