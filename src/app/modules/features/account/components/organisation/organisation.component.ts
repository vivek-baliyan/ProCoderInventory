import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoggedInUserData } from '../../../../../core/models/user/logged-in-user-data';
import { Organisation } from '../../../../../core/models/user/organisation';
import { OrganisationService } from '../../services/organisation.service';
import { NotificationService } from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-organisation',
  standalone: false,
  templateUrl: './organisation.component.html',
  styleUrl: './organisation.component.css',
})
export class OrganisationComponent implements OnInit {
  @Input({ required: true }) userObservable!: Observable<LoggedInUserData>;

  userData!: LoggedInUserData;
  organisationData!: Organisation;

  organisationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private organisationService: OrganisationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.userObservable?.subscribe((userData) => {
      this.userData = userData;
      this.getOrganisationData();
    });

    this.initializeForm();
  }

  initializeForm() {
    // this.organisationForm = this.formBuilder.group({
    //   name: new FormControl(this.organisationData.companyName),
    //   contactPerson: new FormControl(this.organisationData.contactPerson),
    //   websiteUrl: new FormControl(this.organisationData.websiteUrl),
    //   phoneNumber: new FormControl(this.organisationData.phoneNumber),
    //   email: new FormControl(this.organisationData.email),
    //   address: new FormControl(this.organisationData.address),
    //   country: new FormControl(this.organisationData.country),
    //   state: new FormControl(this.organisationData.state),
    //   city: new FormControl(this.organisationData.city),
    //   postalCode: new FormControl(this.organisationData.postalCode),
    // });

    this.organisationForm = this.formBuilder.group({
      organisationName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      websiteUrl: [''],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
      postalCode: [''],
    });
  }

  //patch values to the form
  patchFormValues() {
    this.organisationForm.patchValue({
      organisationName: this.organisationData.companyName,
      contactPerson: this.organisationData.contactPerson,
      websiteUrl: this.organisationData.websiteUrl,
      phoneNumber: this.organisationData.phoneNumber,
      email: this.organisationData.email,
      address: this.organisationData.address,
      country: this.organisationData.country,
      state: this.organisationData.state,
      city: this.organisationData.city,
      postalCode: this.organisationData.postalCode,
    });
  }

  getOrganisationData() {
    this.organisationService
      .getUserOrganisation(this.userData.userId)
      .subscribe({
        next: (response) => {
          this.organisationData = response.data;
          this.patchFormValues();
        }
      });
  }

  onSubmit() {
    console.log('Form submitted:', this.organisationForm.value);

    if (this.organisationForm.valid) {
      const organisation: Organisation = {
        organisationId: this.organisationData?.organisationId ?? 0,
        companyName: this.organisationForm.value.organisationName,
        contactPerson: this.organisationForm.value.contactPerson,
        websiteUrl: this.organisationForm.value.websiteUrl,
        phoneNumber: this.organisationForm.value.phoneNumber,
        email: this.organisationForm.value.email,
        address: this.organisationForm.value.address,
        postalCode: this.organisationForm.value.postalCode,
        city: this.organisationForm.value.city,
        state: this.organisationForm.value.state,
        country: this.organisationForm.value.country,
      };

      if (this.organisationData.organisationId > 0) {
        this.organisationService.updateOrganisation(organisation).subscribe({
          next: (response) => {
            this.organisationData = response.data;
            this.notificationService.showSuccess(
              'Organisation updated successfully',
              'Organisation'
            );
          },
        });
      }

      this.organisationService.createOrganisation(organisation).subscribe({
        next: (response) => {
          this.organisationData = response.data;
          console.log('Organisation created:', response.data);
        },
        error: (error) => {
          console.error('Error updating organisation:', error);
        },
      });
    }
  }
}
