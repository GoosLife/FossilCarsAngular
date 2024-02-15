import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CarComponent } from './car/car.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'car', component: CarComponent, canActivate: [authGuard, roleGuard('admin')] },
  { path: 'login', component: LoginComponent }, 
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideAnimationsAsync(), provideHttpClient()]
};
