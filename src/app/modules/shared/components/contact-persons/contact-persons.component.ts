import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerContact } from '../../../../core/models/customer/customer-contact';
import { ContactType } from '../../../../core/enums/contact-type';

@Component({
  selector: 'app-contact-persons',
  standalone: false,
  templateUrl: './contact-persons.component.html',
  styleUrl: './contact-persons.component.css'
})
export class ContactPersonsComponent {
  @Input() contacts: CustomerContact[] = [];
  @Input() readonly: boolean = false;
  @Output() contactsChange = new EventEmitter<CustomerContact[]>();

  salutationOptions: { value: string; label: string }[] = [
    { value: 'Mr', label: 'Mr.' },
    { value: 'Ms', label: 'Ms.' },
    { value: 'Mrs', label: 'Mrs.' },
    { value: 'Dr', label: 'Dr.' },
    { value: 'Prof', label: 'Prof.' }
  ];

  addContactPerson(): void {
    const newContact: CustomerContact = {
      id: 0,
      customerId: 0,
      contactType: ContactType.Secondary,
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      mobileNumber: '',
      isPrimary: false,
      isActive: true
    };
    
    this.contacts.push(newContact);
    this.contactsChange.emit(this.contacts);
  }

  removeContactPerson(index: number): void {
    this.contacts.splice(index, 1);
    this.contactsChange.emit(this.contacts);
  }

  onContactChange(): void {
    this.contactsChange.emit(this.contacts);
  }
}