
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  description?: string;
}

export type ProductFormData = {
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  status: string;
};
