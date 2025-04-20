import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  exports: [],
})
export class MainModule {}
