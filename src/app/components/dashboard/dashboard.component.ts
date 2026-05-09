import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";

// Definimos la interfaz con mejores tipos para evitar el 'any' excesivo
export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  plotOptions: any;
  dataLabels: any;
  grid: any;
  theme: any;
  colors: string[];
  stroke: any;
  legend: any;
  tooltip: any;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Asegúrate de tener el CSS para el fondo oscuro
})
export class DashboardComponent implements OnInit {
  // Métricas del inventario
  totalProducts: number = 0;
  lowStockCount: number = 0;
  totalInventoryValue: number = 0;

  // Configuración de la gráfica
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Obtenemos los productos desde tu servicio de Spring Boot
    this.productService.getProducts().subscribe({
      next: (products) => {
        // 1. Cálculos de métricas
        this.totalProducts = products.length;
        this.lowStockCount = products.filter(p => p.stockQuantity <= p.minStock).length;
        this.totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stockQuantity), 0);

        // 2. Inicializar gráfica con los datos procesados
        this.initializeChart(products);
      },
      error: (err) => console.error('Error al cargar productos en el dashboard', err)
    });
  }

  private initializeChart(products: any[]) {
    // Agrupamos productos por categoría para el eje X
    const categoriesMap = products.reduce((acc, p) => {
      const catName = p.categoryName || 'Sin Categoría';
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(categoriesMap);
    const data = Object.values(categoriesMap);

    // Configuración optimizada para Modo Oscuro (Estilo Shadcn/Moderno)
    this.chartOptions = {
      series: [{
        name: "Productos",
        data: data
      }],
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        fontFamily: 'Inter, system-ui, sans-serif',
        background: 'transparent', // Permite que se vea el fondo de tu tarjeta CSS
        foreColor: '#94a3b8'        // Color grisáceo para etiquetas de ejes
      },
      colors: ["#10b981"], // Verde esmeralda para el inventario
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
          distributed: false
        }
      },
      dataLabels: { 
        enabled: false 
      },
      grid: {
        borderColor: "#334155", // Color de las líneas de la cuadrícula
        strokeDashArray: 4,
        padding: { top: 10, right: 10, bottom: 10, left: 10 }
      },
      xaxis: {
        categories: labels,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#94a3b8",
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#94a3b8"
          }
        }
      },
      tooltip: {
        theme: "dark", // Forzamos el tooltip a ser oscuro
        x: { show: true },
        y: {
          formatter: (val: number) => `${val} unidades`,
          title: { formatter: () => "Stock: " }
        }
      },
      theme: {
        mode: 'dark' // ESTA ES LA CLAVE: Hace que ApexCharts use paletas oscuras
      }
    };
  }
}
