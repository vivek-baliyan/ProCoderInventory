import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: false,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {

  constructor(private router: Router) {}

  navigateToAdd(): void {
    this.router.navigate(['/app/customers/add']);
  }

  navigateToEdit(customerId?: string): void {
    // For now, navigate to edit without ID, will add proper ID handling later
    this.router.navigate(['/app/customers/edit']);
  }
}
