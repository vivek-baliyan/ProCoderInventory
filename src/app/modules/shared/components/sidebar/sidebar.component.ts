import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menus: any[] = [
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
    {
      isCollapsed: true,
    },
  ];

  toggleMenu(index: number) {
    this.menus.forEach((menu, i) => {
      if (i !== index) {
        menu.isCollapsed = true;
      }
    });
    this.menus[index].isCollapsed = !this.menus[index].isCollapsed;
  }
}
