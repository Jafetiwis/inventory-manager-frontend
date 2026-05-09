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
    // Definimos los campos y sus validaciones
    this.productForm = this.fb.group({
      sku: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.1)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      minStock: [0, Validators.required],
      categoryId: [1, Validators.required] // Por ahora manual, luego haremos el select
    });
  }

  cancelar() {
  this.router.navigate(['/dashboard']); // O la ruta de tu pantalla de inicio
}

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.saveProduct(this.productForm.value).subscribe({
        next: () => {
          // 3. CAMBIO CLAVE: Quitamos el alert y usamos tu servicio
          this.notifyService.showSuccess('¡Producto guardado con éxito!');
          
          this.router.navigate(['/productos']); 
        },
        error: (err) => {
          console.error('Error al guardar', err);
          // 4. OPCIONAL: También puedes avisar si algo salió mal
          this.notifyService.showError('No se pudo guardar el producto');
        }
      });
    }
  }
}