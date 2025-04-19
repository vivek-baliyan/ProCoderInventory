import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BsModalService } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    BsModalService,
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Added for toastr animations
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    AppRoutingModule,
    LayoutModule,
    AuthModule,
    DashboardModule,
    SharedModule,
  ],
})
export class AppModule {}
