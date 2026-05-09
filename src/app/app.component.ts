import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/products-list/products-list.component';
import { ToastComponent } from "./components/toast/toast.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ProductListComponent, ToastComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarCollapsed = false;
  title = 'sistema-inventario-frontend';

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log('¿Está colapsado?:', this.isSidebarCollapsed);
  }
}
