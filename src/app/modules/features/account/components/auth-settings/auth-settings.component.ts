import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInUserData } from '../../../../../core/models/user/logged-in-user-data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UpdateLoginDetails } from '../../../../../core/models/user/update-login-details';

@Component({
  selector: 'app-auth-settings',
  standalone: false,
  templateUrl: './auth-settings.component.html',
  styleUrl: './auth-settings.component.css',
})
export class AuthSettingsComponent implements OnInit {
  @Input({ required: true }) userObservable!: Observable<LoggedInUserData>;
  @Output() onLoginDetailUpdate = new EventEmitter<UpdateLoginDetails>();

  userData!: LoggedInUserData;

  @ViewChild('changeAuthenticationModal')
  changeAuthenticationModal!: TemplateRef<any>;
  modalRef?: BsModalRef;

  changeAuthenticationForm!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userObservable?.subscribe((userData) => {
      this.userData = userData;
    });

    this.initializeForm();
  }

  initializeForm() {
    this.changeAuthenticationForm = this.formBuilder.group({
      email: [this.userData.email, [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.changeAuthenticationForm.valid) {
      const formData = this.changeAuthenticationForm.value;

      const userLogin: UpdateLoginDetails = {
        userId: this.userData.userId,
        email: formData.email,
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };

      this.onLoginDetailUpdate.emit(userLogin);
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to open the modal
  openModal() {
    this.modalRef = this.modalService.show(this.changeAuthenticationModal, {
      class:
        'modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable',
      backdrop: 'static',
      animated: true,
      keyboard: false,
    });
  }

  closeModal() {
    this.changeAuthenticationForm.reset();
    this.modalRef?.hide();
  }
}
