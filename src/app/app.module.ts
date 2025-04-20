import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BsModalService } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { MainModule } from './modules/main/main.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    BsModalService,
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])),
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Added for toastr animations
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    AuthModule,
    MainModule,
    SharedModule,
  ],
})
export class AppModule {}
