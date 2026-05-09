export interface ProductDTO {
  id: number;
  sku: string;
  name: string;
  stockQuantity: number;
  minStock: number;
  price: number;
  categoryId: number;
  categoryName?: string;
}