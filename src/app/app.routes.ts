import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/products-list/products-list.component';
// 1. Importa el Stepper
import { StepperComponent } from './components/shared/stepper/stepper.component'; 

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productos', component: ProductListComponent },
  { path: 'nuevo-producto', component: StepperComponent }, 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];