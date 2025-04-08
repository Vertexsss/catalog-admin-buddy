
import { Product } from "@/types/product";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "T-Shirt",
    category: "Clothing",
    price: "$19.99",
    stock: 43,
    status: "Active",
  },
  {
    id: 2,
    name: "Jeans",
    category: "Clothing",
    price: "$49.99",
    stock: 32,
    status: "Active",
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Footwear",
    price: "$79.99",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Watch",
    category: "Accessories",
    price: "$129.99",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Backpack",
    category: "Accessories",
    price: "$59.99",
    stock: 0,
    status: "Out of Stock",
  },
];
