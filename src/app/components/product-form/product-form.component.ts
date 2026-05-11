import { Component, Output, EventEmitter } from '@angular/core'; // Añadimos Output y EventEmitter
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
  @Output() onSuccess = new EventEmitter<void>();

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
      price: [null, [Validators.required, Validators.min(0.1)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      minStock: [null, Validators.required],
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
          
          this.onSuccess.emit();
          
        },
        error: (err) => {
          console.error('Error al guardar', err);
          this.notifyService.showError('No se pudo guardar el producto');
        }
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}