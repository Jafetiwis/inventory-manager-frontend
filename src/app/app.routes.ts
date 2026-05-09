import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/products-list/products-list.component'; // Verifica la 's'
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productos', component: ProductListComponent },
  { path: 'nuevo-producto', component: ProductFormComponent }, // Esta es la ruta del botón
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];