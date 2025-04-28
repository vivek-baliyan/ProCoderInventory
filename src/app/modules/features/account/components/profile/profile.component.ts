import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateProfile } from '../../../../../core/models/user/update-profile';
import { User } from '../../../../../core/models/user/user';
import { first } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @ViewChild('editProfileModal') editProfileModal!: TemplateRef<any>;

  @Input({ required: true }) userData!: User;
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
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      profileImage: [this.userData.profileImageUrl],
      bio: [this.userData.bio],
      phone: [this.userData.phoneNumber],
      dateOfBirth: [this.userData.dateOfBirth],
      address: [this.userData.address],
      country: [this.userData.country],
      state: [this.userData.state],
      city: [this.userData.city],
      postalCode: [this.userData.postalCode],
    });
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      var formData = this.editProfileForm.value;

      const updatProfile: UpdateProfile = {
        userId: this.userData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profileImageUrl: formData.profileImage,
        bio: formData.bio,
        phoneNumber: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        postalCode: formData.postalCode,
      };

      this.onProfileUpdate.emit(updatProfile);
    }
  }
  get getUserAge(): number {
    const birthDateObj = new Date(this.userData.dateOfBirth!);
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
