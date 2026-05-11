import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { NotificationService } from '../../services/notification.service'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmModalComponent], 
  templateUrl: './lista-final.component.html'
})
export class ProductListComponent implements OnInit {
  @Input() isStepperMode: boolean = false;
  products: ProductDTO[] = [];

  showModal = false;
  selectedProductId: number | null = null;
  selectedProductName = '';

  constructor(
    private productService: ProductService,
    private notifyService: NotificationService 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Productos cargados:', data);
      },
      error: (err) => console.error('Error al conectar con el backend', err)
    });
  }

  confirmarEliminacion(id: number, name: string) {
    this.selectedProductId = id;
    this.selectedProductName = name;
    this.showModal = true;
  }

  deleteConfirmed() {
    if (this.selectedProductId) {
      this.productService.deleteProduct(this.selectedProductId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== this.selectedProductId);
          
          this.showModal = false;
          this.selectedProductId = null;
          this.selectedProductName = '';

          this.notifyService.showSuccess('¡Producto eliminado con éxito!');
        },
        error: (err) => {
          console.error('Error al borrar el producto', err);
          this.notifyService.showError('No se pudo eliminar el producto');
          this.showModal = false;
        }
      });
    }
  }
}