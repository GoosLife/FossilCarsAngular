import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CarComponent } from './car/car.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'car', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideAnimationsAsync(), provideHttpClient()]
};
