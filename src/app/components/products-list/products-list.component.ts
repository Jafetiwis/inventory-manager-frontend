import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './lista-final.component.html'
})
export class ProductListComponent implements OnInit {
  products: ProductDTO[] = [];

  constructor(private productService: ProductService) {}

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

  eliminarProducto(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          console.log('Producto eliminado correctamente con ID:', id);
        },
        error: (err) => {
          console.error('Error al borrar el producto', err);
          alert('No se pudo eliminar el producto. Verifica la conexión con el backend.');
        }
      });
    }
  }
}