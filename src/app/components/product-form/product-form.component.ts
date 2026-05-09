import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private notifyService: NotificationService
  ) {
    this.productForm = this.fb.group({
      sku: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.1)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      minStock: [0, Validators.required],
      categoryId: [1, Validators.required] 
    });
  }

  cancelar() {
  this.router.navigate(['/dashboard']);
}

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.saveProduct(this.productForm.value).subscribe({
        next: () => {
          this.notifyService.showSuccess('¡Producto guardado con éxito!');
          
          this.router.navigate(['/productos']); 
        },
        error: (err) => {
          console.error('Error al guardar', err);
          this.notifyService.showError('No se pudo guardar el producto');
        }
      });
    }
  }
}