import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

    getProducts(): Observable<ProductDTO[]> {
      return this.http.get<ProductDTO[]>(this.apiUrl);
    }

    getLowStock(): Observable<ProductDTO[]> {
      return this.http.get<ProductDTO[]>(`${this.apiUrl}/low-stock`);
    }

    searchByName(name: string): Observable<ProductDTO[]> {
      return this.http.get<ProductDTO[]>(`${this.apiUrl}/search?name=${name}`);
    }

    saveProduct(product: ProductDTO): Observable<ProductDTO> {
      return this.http.post<ProductDTO>(this.apiUrl, product);
    }

    deleteProduct(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
    }
  }
