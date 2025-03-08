import { Component, input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  itemName = input.required<string>();
  isCollapsed = false;
}
