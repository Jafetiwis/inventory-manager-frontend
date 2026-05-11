import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../../product-form/product-form.component'; 
import { ProductListComponent } from '../../products-list/products-list.component'; 

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  currentStep: number = 1;

  goToStep(step: number) {
    this.currentStep = step;
  }
}